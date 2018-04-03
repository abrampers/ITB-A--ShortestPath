from heapq import heappush, heappop
from math import sqrt

def astar(distance_mat, is_connected, start_node, end_node):
	q = [] # Prio-Q for A*. (distance, (node1, node2, ...))
	# Initialize q with the start node
	for dest_node in range(0, len(distance_mat)) :
		if is_connected[start_node][dest_node]:
			heappush(q, ((distance_mat[start_node][dest_node]) + distance_mat[dest_node][end_node], (start_node, dest_node)))
	# Start the A* algorithm
	while q: # While there are still potential path to be explored...
		if q[0][1][-1] == end_node: break # If the shortest path yet is able to reach the end node, break
		prev_nodes = heappop(q)[1]
		# Compute previous distance
		prev_weight = 0
		for x in prev_nodes[1:]: prev_weight += distance_mat[prev_nodes.index(x) - 1][x]
		# Insert the next potential path into heapq
		for dest_node in range(0, len(distance_mat)) :
			if (is_connected[prev_nodes[-1]][dest_node]) and (dest_node not in prev_nodes):
				heappush(q, (prev_weight + distance_mat[prev_nodes[-1]][dest_node] + distance_mat[dest_node][end_node], prev_nodes + (dest_node,)))
			# If it's a dead end, it won't be pushed again: it'll be evicted permanently from the q
	# Return
	return heappop(q) if q else ()