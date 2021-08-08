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
    g = net.MultiDiGraph()
    g1 = net.MultiDiGraph()

    with open(file_name, 'r') as dataset:
      for LINE in dataset:
        line = LINE.split(' ')
        if( float(line[0])<160):
            s_id = int(line[1])
            d_id = int(line[2])
            g.add_nodes_from([s_id, d_id])
            g.add_edge(s_id,d_id,color='g')
            g1.add_edge(s_id, d_id, color='g')
        else:
            if ((int(line[0]) < 300)):
                if((s_id, d_id) in g1.edges()):
                    g1.remove_edge(s_id, d_id)
                g1.add_nodes_from([s_id, d_id])
                g1.add_edge(s_id, d_id, color='r')

    colors = net.get_edge_attributes(g,'color').values()

    net.draw(g,with_labels = True, edge_color=colors)
    plt.savefig("../graphs/four_grids1.png")
    plt.clf()
    colors1 = net.get_edge_attributes(g1, 'color').values()
    net.draw(g1, with_labels=True, edge_color=colors1)
    plt.savefig("../graphs/four_grids2.png")
