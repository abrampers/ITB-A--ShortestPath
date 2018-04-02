import queue

# Global Variables
MAX_INT = -1
n = 0
graph = []
heuristic_graph = []

""" Benerin sini untuk init dari map """
def initialize_graph():
	global graph
	global n

	n = int(input())
	graph = [[float(input()) for j in range(n)] for i in range(n)]

def shortest_path(start_vertex, dest_vertex):
	q = queue.PriorityQueue()

	cost = 0
	h = heuristic(start_vertex, dest_vertex)
	q.put((h, start_vertex))

	while !q.empty():
		cur_vertex = q.get()

		for i in range(n):
			if(graph[cur_vertex][i] != -1):
				

def main():
	initialize_graph()
	res = shortest_path()

	# Print res

if __name__ == '__main__':
	main()