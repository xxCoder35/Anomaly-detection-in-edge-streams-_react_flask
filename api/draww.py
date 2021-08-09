import networkx as net
import matplotlib.pyplot as plt
class draww():
  def __init__(self, file_name):
    class data_point():
      def __init__(self):
        self.s_id = None
        self.d_id = None
        self.weight = None
        self.curr_time = None
if __name__ == "__main__":
    file_name="../data/4_poisoned.txt"

    i = 0
    N = 5 #nombre de captures
    t_init = 15 #instant debut
    t_end = 159 #Fin
    delai = 5
    g = [net.MultiDiGraph() for i in range(N)]

    with open(file_name, 'r') as dataset:
      for LINE in dataset:
        line = LINE.split(' ')
        idx = (int(line[0]) - t_init )// delai
        s_id = int(line[1])
        d_id = int(line[2])
        for i in range(idx,N):
            if (i==idx):
                print('green')
                if((s_id,d_id) in g[i].edges()):
                    print('deleted')
                    g[i].remove_edge(s_id,d_id)
                g[i].add_edge(s_id, d_id, color='g')
            else :
                g[i].add_edge(s_id, d_id, color='b')
    for i in range(N) :
           plt.clf()
           print(g[i].edges())
           colors = net.get_edge_attributes(g[i], 'color').values()
           net.draw(g[i], with_labels=True, edge_color=colors)
           plt.savefig("../graphs/graphe" + str(i) + ".png")



