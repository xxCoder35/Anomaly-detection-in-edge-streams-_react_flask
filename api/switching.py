from Fade import *
from Fade.lancer import lancer
from Fade.attack import poison


def to_json(AUC,FPR,time) :
    resultat={'AUC':AUC,'FPR':FPR,'time':time}
    return resultat
def switch(dic) :
    AUC,FPR,t = lancer(str(dic['file']),int(dic['amelioree']))
    resultat = to_json(AUC,FPR,t)
    return resultat
def attaquer(dic):
    print(dic)
    poison(int(dic['poison_size']),dic['file'], dic['file_out'], int(dic['t_insert']), int(dic['src']),int(dic['dest']))
    return 1


