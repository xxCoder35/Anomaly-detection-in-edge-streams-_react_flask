from utils import *
from utils import *
from model import *
from sklearn import metrics
from arguments import parse_arguments
import os
import json
import numpy as np
import pandas as pd

def lancer(dataset_file):
  args = parse_arguments()
  device = torch.device('cuda:' + str(args.gpu) if torch.cuda.is_available() else 'cpu')
  if not os.path.exists(args.model_dir):
    os.mkdir(args.model_dir)
  with open('./result/arg_list.txt', 'w') as file:
    json.dump(args.__dict__, file, indent=2)
  dataset = Dataset(dataset_file)#should change this
  model = Model(num_nodes = dataset.num_nodes, embedding_size = args.embedding_size).to(device = device)
  F_FADE = F_FADE(model, dataset, args.t_setup, args.W_upd, args.alpha, args.M, args.T_th, args.epochs, args.online_train_steps, args.batch_size, device)
  np.savetxt(args.model_dir + 'score.txt', np.array(F_FADE).reshape((-1, 1)))
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

  #np.savetxt(args.model_dir + 'anomalous.txt', anomalous.mask, fmt='%d')
  AUC = metrics.auc(fpr, tpr)
  print("AUC: {}".format(AUC))
  with open(args.model_dir + 'AUC.txt', 'w') as file:
    file.write(json.dumps(AUC))
