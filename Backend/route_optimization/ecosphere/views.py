from django.shortcuts import render
from rest_framework.response import Response
import requests
from rest_framework.decorators import (
    api_view,
    renderer_classes,
    permission_classes,
    parser_classes,
)
import json
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import math

# Create your views here.

total_all_truck_routes_details = []
resultant_data = {}

def calculate_euclidean_distance(origin, destination):
    """Calculate straight-line distance between two points."""
    R = 6371000  # Earth's radius in meters
    lat1, lon1 = math.radians(origin[0]), math.radians(origin[1])
    lat2, lon2 = math.radians(destination[0]), math.radians(destination[1])
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    distance = R * c
    
    return round(distance)  # Return distance in meters

def get_distance_from_google_maps(origin, destination):
    """Get distance between two points from Google Maps."""
    try:
        base_url = "https://maps.googleapis.com/maps/api/distancematrix/json"
        params = {
            'origins': f"{origin[0]},{origin[1]}",
            'destinations': f"{destination[0]},{destination[1]}",
            'mode': 'driving',
            'key': settings.GOOGLE_MAPS_API_KEY
        }
        
        response = requests.get(base_url, params=params)
        data = response.json()
        
        if data['status'] == 'OK':
            if data['rows'][0]['elements'][0]['status'] == 'OK':
                return data['rows'][0]['elements'][0]['distance']['value']
        
        # If API fails, fallback to euclidean distance
        return calculate_euclidean_distance(origin, destination)
    except Exception as e:
        print(f"Error getting distance from Google Maps: {str(e)}")
        return calculate_euclidean_distance(origin, destination)

def create_data_model(bins_data):
    """Creates the data model for the optimization."""
    # Add depot as the first location
    depot = {
        'location': (18.5204, 73.8567),  # Pune central coordinates
        'demand': 0
    }
    
    # Create locations list with depot as first point
    locations = [depot['location']]
    demands = [depot['demand']]
    
    # Add bin locations and demands
    for bin in bins_data:
        locations.append((bin['binLocation']['lat'], bin['binLocation']['lon']))
        demands.append(bin['binFillLevel'])
    
    # Calculate distance matrix
    distance_matrix = []
    for i, origin in enumerate(locations):
        row = []
        for j, dest in enumerate(locations):
            if i == j:
                row.append(0)
            else:
                distance = get_distance_from_google_maps(origin, dest)
                row.append(distance)
        distance_matrix.append(row)
    
    data = {
        'distance_matrix': distance_matrix,
        'demands': demands,
        'vehicle_capacities': [100, 100, 100, 100],  # 4 trucks with 100 capacity each
        'num_vehicles': 4,
        'depot': 0
    }
    
    return data

@api_view(['POST'])
@csrf_exempt
def getRouteData(request):
    try:
        # Get the depot location
        depot = {
            'location': {
                'lat': 18.525003,
                'lng': 73.855504
            }
        }
        
        # Get bins data from request
        bins_data = request.data if request.data else []
        
        # Create mock routes for demonstration
        routes = [
            {
                'truck_id': 1,
                'route': [
                    {
                        'id': 'bin1',
                        'binLocation': {
                            'lat': 18.5204,
                            'lon': 73.8567,
                            'fotmattedAddress': 'MG Road, Pune'
                        },
                        'binFillLevel': 75
                    },
                    {
                        'id': 'bin2',
                        'binLocation': {
                            'lat': 18.5314,
                            'lon': 73.8446,
                            'fotmattedAddress': 'FC Road, Pune'
                        },
                        'binFillLevel': 60
                    }
                ],
                'distance': 5000,
                'load': 135
            },
            {
                'truck_id': 2,
                'route': [
                    {
                        'id': 'bin3',
                        'binLocation': {
                            'lat': 18.5114,
                            'lon': 73.8346,
                            'fotmattedAddress': 'JM Road, Pune'
                        },
                        'binFillLevel': 85
                    },
                    {
                        'id': 'bin4',
                        'binLocation': {
                            'lat': 18.5167,
                            'lon': 73.8562,
                            'fotmattedAddress': 'Shivaji Nagar, Pune'
                        },
                        'binFillLevel': 70
                    }
                ],
                'distance': 4500,
                'load': 155
            }
        ]
        
        return Response({
            'total_distance': 9500,
            'total_garbage_picked': 290,
            'truck_routes': routes
        })
        
    except Exception as e:
        print(f"Error in getRouteData: {str(e)}")
        return Response(
            {'error': str(e)}, 
            status=500
        )

@api_view(['GET'])
@csrf_exempt
def get_bins(request):
    try:
        # Mock data for bins in Pune
        bins = [
            {
                "id": "bin1",
                "binLocation": {
                    "lat": 18.5204,
                    "lon": 73.8567,
                    "fotmattedAddress": "MG Road, Pune"
                },
                "binFillLevel": 75
            },
            {
                "id": "bin2",
                "binLocation": {
                    "lat": 18.5314,
                    "lon": 73.8446,
                    "fotmattedAddress": "FC Road, Pune"
                },
                "binFillLevel": 60
            },
            {
                "id": "bin3",
                "binLocation": {
                    "lat": 18.5114,
                    "lon": 73.8346,
                    "fotmattedAddress": "JM Road, Pune"
                },
                "binFillLevel": 85
            },
            {
                "id": "bin4",
                "binLocation": {
                    "lat": 18.5167,
                    "lon": 73.8562,
                    "fotmattedAddress": "Shivaji Nagar, Pune"
                },
                "binFillLevel": 70
            },
            {
                "id": "bin5",
                "binLocation": {
                    "lat": 18.5289,
                    "lon": 73.8744,
                    "fotmattedAddress": "Koregaon Park, Pune"
                },
                "binFillLevel": 90
            }
        ]
        return Response(bins)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

def create_distance_matrix(data):
    """Creates the distance matrix using Google Maps Distance Matrix API."""
    addresses = data["addresses"]
    API_key = data["API_key"]
    
    # Distance Matrix API only accepts 100 elements per request
    max_elements = 100
    num_addresses = len(addresses)
    max_rows = max_elements // num_addresses
    q, r = divmod(num_addresses, max_rows)
    
    distance_matrix = []
    
    for i in range(q):
        origin_addresses = addresses[i * max_rows: (i + 1) * max_rows]
        response = send_request(origin_addresses, addresses, API_key)
        distance_matrix += build_distance_matrix(response)

    if r > 0:
        origin_addresses = addresses[q * max_rows: q * max_rows + r]
        response = send_request(origin_addresses, addresses, API_key)
        distance_matrix += build_distance_matrix(response)
    
    return distance_matrix

def send_request(origin_addresses, dest_addresses, API_key):
    """Send request to Google Maps Distance Matrix API."""
    base_url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    
    # Join addresses with pipe
    origins = '|'.join(origin_addresses)
    destinations = '|'.join(dest_addresses)
    
    params = {
        'origins': origins,
        'destinations': destinations,
        'key': API_key
    }
    
    response = requests.get(base_url, params=params)
    return response.json()

def build_distance_matrix(response):
    """Build distance matrix from API response."""
    matrix = []
    for row in response['rows']:
        row_list = [
            element['distance']['value'] if element['status'] == 'OK' else 0 
            for element in row['elements']
        ]
        matrix.append(row_list)
    return matrix

def getFinalResult(data, depot_data, bins_data):
    """
    Implement the route optimization logic here.
    This is a simplified version that creates mock routes.
    """
    # Mock implementation
    total_distance = 0
    total_garbage = 0
    
    # Create mock routes
    routes = []
    current_route = []
    current_capacity = 0
    
    for bin in bins_data:
        if current_capacity + bin['binFillLevel'] > 100:
            routes.append(current_route)
            current_route = []
            current_capacity = 0
        
        current_route.append(bin)
        current_capacity += bin['binFillLevel']
        total_garbage += bin['binFillLevel']
    
    if current_route:
        routes.append(current_route)
    
    # Update global variables
    total_all_truck_routes_details.extend(routes)
    resultant_data.update({
        'total_distance': 50000,  # Mock total distance (50km)
        'total_garbage_picked': total_garbage
    })

@api_view(("GET","POST"))
def getFirstOBJ(request):
    return Response([
    {
        "_id": "660454e69ffb0d49a41574de",
        "depotName": "Pune Garbage Depot",
        "depotLocation": {
            "lat": 18.525003,
            "lon": 73.855504,
            "formattedAddress": "GVG4+26C, Tophakhana, Shivajinagar, Pune, Maharashtra 411005, India"
        },
        "depotCapacity": None,
        "createdDate": "2024-03-27T17:18:30.939Z"
    }
])    
    
import requests
import json
import urllib.request




"""Capacited Vehicles Routing Problem (CVRP)."""

def print_solution(data, manager, routing, solution, depot_data, all_bin_data):
    """Prints solution on console."""
    print(f"Objective: {solution.ObjectiveValue()}")
    total_distance = 0
    total_load = 0
    all_truck_nodes = []

    for vehicle_id in range(data["num_trucks"]):
        index = routing.Start(vehicle_id)
        plan_output = f"Route for vehicle {vehicle_id}:\n"
        route = []
        route_array = []
        route_distance = 0
        route_load = 0
        while not routing.IsEnd(index):
            node_index = manager.IndexToNode(index)
            route_load += data["fill_levels"][node_index]
            if(node_index==0):
                route_array.append(depot_data[0]) 
            else:
               if(data['fill_levels'][node_index]>0):  
                route_array.append(all_bin_data[node_index-1])
               
            route.append(node_index)
            plan_output += f" {node_index} Load({route_load}) -> "
            previous_index = index
            index = solution.Value(routing.NextVar(index))
            route_distance += routing.GetArcCostForVehicle(
                previous_index, index, vehicle_id
            )
            
        route.append(0)
        route_array.append(depot_data[0])
        total_all_truck_routes_details.append(route_array)
        all_truck_nodes.append(route)
        plan_output += f" {manager.IndexToNode(index)} Load({route_load})\n"
        plan_output += f"Distance of the route: {route_distance}m\n"
        plan_output += f"Load of the route: {route_load}\n"
        print(plan_output)
        total_distance += route_distance
        total_load += route_load
    # print("Mit Shah\n\n\n")
    # print(total_all_truck_routes_details)
    # resultant_data = {
        # "total_distance": total_distance,
        # "total_garbage_picked": total_load,
        # "truck_routes": total_all_truck_routes_details,
        
    # }
    resultant_data.update({    "total_distance": total_distance,
        "total_garbage_picked": total_load,
        "truck_routes": total_all_truck_routes_details})
    print(f"Total distance of all routes: {total_distance}m")
    print(f"Total load of all routes: {total_load}")


