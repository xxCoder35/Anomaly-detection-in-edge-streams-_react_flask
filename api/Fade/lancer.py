
from Fade import utils
from Fade import model
import torch
from sklearn import metrics
from Fade import arguments
import os
import json
import numpy as np
import pandas as pd

def perf_measure(y_actual, y_hat):
  TP = 0
  FP = 0
  TN = 0
  FN = 0

  for i in range(len(y_hat)):
    if y_actual[i] == y_hat[i] == 1:
      TP += 1
    if y_hat[i] == 1 and y_actual[i] != y_hat[i]:
      FP += 1
    if y_actual[i] == y_hat[i] == 0:
      TN += 1
    if y_hat[i] == 0 and y_actual[i] != y_hat[i]:
      FN += 1

  return (TP, FP, TN, FN)
def lancer(dataset_file):
  args = arguments.parse_arguments()


  cwd = os.getcwd()
  print(cwd)
  device = torch.device('cuda:' + str(args[0].gpu) if torch.cuda.is_available() else 'cpu')
  if not os.path.exists(args[0].model_dir):
    os.mkdir(args[0].model_dir)
  with open('./result/arg_list.txt', 'w') as file:
    json.dump(args[0].__dict__, file, indent=2)
  dataset = utils.Dataset(dataset_file)#should change this
  modela = model.Model(num_nodes = dataset.num_nodes, embedding_size = args[0].embedding_size).to(device = device)
  F_FADE = model.F_FADE(modela, dataset, args[0].t_setup, args[0].W_upd, args[0].alpha, args[0].M, args[0].T_th, args[0].epochs, args[0].online_train_steps, args[0].batch_size, device)
  np.savetxt(args[0].model_dir + 'score.txt', np.array(F_FADE).reshape((-1, 1)))
  F_FADE = np.array(F_FADE)

  for i in range(len(F_FADE)):
    if np.isnan(F_FADE[i]):
      F_FADE[i] = 0
  fpr, tpr, thresholds = metrics.roc_curve(dataset.label[-len(F_FADE):], F_FADE, pos_label=1)
  df_thres = pd.DataFrame({'FPR': fpr, 'TPR': tpr, 'Threshold': thresholds})
  gmean = np.sqrt(df_thres["TPR"] * (1 - df_thres["FPR"]))
  # retourne l'index de thr optimal
  index = np.argmax(gmean)
  thresholdOpt = round(thresholds[index], ndigits=4)
  gmeanOpt = round(gmean[index], ndigits=4)
  fprOpt = round(fpr[index], ndigits=4)
  tprOpt = round(tpr[index], ndigits=4)
  print('Best Threshold: {} with G-Mean: {}'.format(thresholdOpt, gmeanOpt))
  print('FPR: {}, TPR: {}'.format(fprOpt, tprOpt))
  anomalous = np.ma.masked_greater(np.array(F_FADE), thresholdOpt)

  #np.savetxt(args[0].model_dir + 'anomalous.txt', anomalous.mask, fmt='%d')
  AUC = metrics.auc(fpr, tpr)
  #m = perf_measure(dataset.label[-len(F_FADE):], anomalous.mask)
  #FNR = m[3] / (m[0] + m[3])
  print("AUC: {}".format(AUC))
  with open(args[0].model_dir + 'AUC.txt', 'w') as file:
    file.write(json.dumps(AUC))
  return AUC,thresholdOpt
