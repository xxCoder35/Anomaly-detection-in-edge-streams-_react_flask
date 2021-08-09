import networkx as net
import matplotlib.pyplot as plt


def draw_stream(stream_file_name, t_init, t_end, len_capture):
    N = (t_end-t_init)//len_capture  # nombre de captures
    g = [net.MultiDiGraph() for i in range(N)]

    with open(stream_file_name, 'r') as dataset:
        for LINE in dataset:
            line = LINE.split(' ')
            idx =  (int(line[0]) - t_init) // len_capture if ((int(line[0]) - t_init)>0) else 0
            s_id = int(line[1])
            d_id = int(line[2])
            for i in range(idx, N):
                if (i == idx):
                    print('green')
                    if ((s_id, d_id) in g[i].edges()):
                        print('deleted')
                        g[i].remove_edge(s_id, d_id)
                    g[i].add_edge(s_id, d_id, color='g')
                else:
                    g[i].add_edge(s_id, d_id, color='b')
    for i in range(N):
        plt.clf()
        colors = net.get_edge_attributes(g[i], 'color').values()
        net.draw(g[i], with_labels=True, edge_color=colors)
        plt.title('hey')
        plt.savefig("../public/graphs/graphe" + str(i) + ".png")
    return N
if __name__ == "__main__":
    file_name = "../data/4_poisoned.txt"
    draw_stream(file_name,100,150,15)