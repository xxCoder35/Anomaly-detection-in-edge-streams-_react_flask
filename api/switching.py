from Fade import *
from Fade.lancer import lancer



def to_json(AUC,FPR) :
    resultat={'AUC':AUC,'FPR':FPR}
    return resultat
def switch(dic) :
    if (int(dic['amelioree'])==1):
        AUC,FPR = lancer(str(dic['file']))
        print('normal executed! :)')
        resultat = to_json(AUC,FPR)
        return resultat
    else :
        return to_json(0,0)
    return -1