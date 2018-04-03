'''
Note that with this design, 
* Dead ends will be evicted permanently from the queue
* If the end node can't be reached, it will infinitely loop
'''

from heapq import heappush, heappop
from math import sqrt

# The map is represented by a tuple of nodes coordinate and a boolean matrix that tells whether 2 nodes are connected 
nodes = ((0,0), (1,0), (1,1), (1.5,1.5), (2,2)) 
is_connected = [] # Row = from
is_connected.append([False, True, True, False, False])
is_connected.append([True, False, False, False, False])
is_connected.append([True, False, False, True, True])
is_connected.append([False, False, True, False, True])
is_connected.append([False, False, True, True, False])
start_node = 0 
end_node = 4 
q = [] # Prio-Q for A*. (distance, (node1, node2, ...))

def eDistance(node1, node2): return sqrt((node1[0] - node2[0])**2 + (node1[1] - node2[1])**2)

# Initialize q with the start node
for dest_node in range(0, len(nodes)) :
	if is_connected[start_node][dest_node]:
		heappush(q, (eDistance(nodes[start_node], nodes[dest_node]) + eDistance(nodes[dest_node], nodes[end_node]), (start_node, dest_node)))
# Start the A* algorithm
while q[0][1][-1] != end_node: # If the shortest path yet is able to reach the end node, break
	prev_nodes = heappop(q)[1]
	# Compute previous distance
	prev_weight = 0
	for x in prev_nodes[1:]: prev_weight += eDistance(nodes[prev_nodes.index(x) - 1], nodes[x])
	# Insert into heapq
	for dest_node in range(0, len(nodes)) :
		if (is_connected[prev_nodes[-1]][dest_node]) and (dest_node not in prev_nodes):
			heappush(q, (prev_weight + eDistance(nodes[prev_nodes[-1]], nodes[dest_node]) + eDistance(nodes[dest_node], nodes[end_node]), prev_nodes + (dest_node,)))
# Print
print(heappop(q))