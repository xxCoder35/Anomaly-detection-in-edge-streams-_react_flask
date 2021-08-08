import pandas as pd
import numpy as np

def poison(poison_size, file, file_out, t_insert, src, dest):
    data = pd.read_csv('./data/'+str(file), delimiter= " ")
    DOS = pd.DataFrame(np.repeat([(t_insert, src, dest,1)], poison_size, axis=0))
    DOS.columns = data.columns
    data = pd.concat([data.loc[data.iloc[:,0]<t_insert],DOS,data.loc[data.iloc[:,0]>=t_insert]],axis = 0,ignore_index=True)
    data.to_csv('./data/'+str(file_out),sep = " ",index= False,header=False)
    return 1