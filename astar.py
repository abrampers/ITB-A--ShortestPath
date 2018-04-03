from heapq import heappush, heappop
from math import sqrt

# The map is represented by a tuple of nodes coordinate and a boolean matrix that tells whether 2 nodes are connected 
nodes = ((0,0), (1,0), (1,1), (1.5,1.5), (2,2), (3,3)) 
is_connected = [] # Row = from
is_connected.append([False, True, True, False, False, False])
is_connected.append([True, False, False, False, False, False])
is_connected.append([True, False, False, True, True, False])
is_connected.append([False, False, True, False, True, False])
is_connected.append([False, False, True, True, False, False])
is_connected.append([False, False, False, False, False, False])

def eDistance(node1, node2): return sqrt((node1[0] - node2[0])**2 + (node1[1] - node2[1])**2)

def astar(nodes, is_connected, start_node, end_node):
	q = [] # Prio-Q for A*. (distance, (node1, node2, ...))
	# Initialize q with the start node
	for dest_node in range(0, len(nodes)) :
		if is_connected[start_node][dest_node]:
			heappush(q, (eDistance(nodes[start_node], nodes[dest_node]) + eDistance(nodes[dest_node], nodes[end_node]), (start_node, dest_node)))
	# Start the A* algorithm
	while q: # While there are still potential path to be explored...
		if q[0][1][-1] == end_node: break # If the shortest path yet is able to reach the end node, break
		prev_nodes = heappop(q)[1]
		# Compute previous distance
		prev_weight = 0
		for x in prev_nodes[1:]: prev_weight += eDistance(nodes[prev_nodes.index(x) - 1], nodes[x])
		# Insert the next potential path into heapq
		for dest_node in range(0, len(nodes)) :
			if (is_connected[prev_nodes[-1]][dest_node]) and (dest_node not in prev_nodes):
				heappush(q, (prev_weight + eDistance(nodes[prev_nodes[-1]], nodes[dest_node]) + eDistance(nodes[dest_node], nodes[end_node]), prev_nodes + (dest_node,)))
			# If it's a dead end, it won't be pushed again: it'll be evicted permanently from the q
	# Return
	return heappop(q) if q else ()