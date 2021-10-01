import pandas as pd
import numpy as np
from Fade import *
from Fade.lancer import lancer
from Fade.attack import poison
from draw_stream import draw_stream


def to_json(AUC,FPR,time) :
    resultat={'AUC':AUC,'FPR':FPR,'time':time}
    return resultat
def switch(dic) :
    AUC,FPR,t = lancer(str(dic['file']),int(dic['amelioree']))
    resultat = to_json(AUC,FPR,t)
    return resultat
def attaquer(dic):
    poison(int(dic['poison_size']),dic['file'], dic['file_out'], int(dic['t_insert']), int(dic['src']),int(dic['dest']))
    return 1
def visualize(dic):
    nb = draw_stream(dic['file'], int(dic['debut']), int(dic['end']), int(dic['len']))
    return {'N': nb}
def get_dataset_infos(dic):

    data = pd.read_csv(dic['file'],delimiter=" ")
    # nodes number
    src = data.iloc[:,1]
    dest = data.iloc[:,2]
    nodes = np.unique(np.concatenate((src, dest), 0))
    edge = list(zip(src, dest))
    res = list(set(edge))
    return {'Nodes': len(nodes),'edges': len(res)}



