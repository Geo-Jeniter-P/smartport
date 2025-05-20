from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"

bus_routes_data = [
    {
        "route_number": "27B",
        "stops": ["T. ANagar", "Saidapet", "Guindy"],
        "path_coordinates": [
            {"lat": 13.0333, "lng": 80.2333},
            {"lat": 13.0200, "lng": 80.2250},
            {"lat": 13.0100, "lng": 80.2200}
        ]
    },
    {
        "route_number": "51",
        "stops": ["Central Station", "Egmore", "Nungambakkam"],
        "path_coordinates": [
            {"lat": 13.0827, "lng": 80.2707},
            {"lat": 13.0750, "lng": 80.2620},
            {"lat": 13.0600, "lng": 80.2450}
        ]
    }
]

def normalize_stop(stop):
    return stop.lower().replace(", chennai", "").strip()

def find_bus_routes(source, destination):
    source = normalize_stop(source)
    destination = normalize_stop(destination)

    matching_routes = []
    for route in bus_routes_data:
        stops_normalized = [normalize_stop(s) for s in route["stops"]]
        if (
            source in stops_normalized and
            destination in stops_normalized and
            stops_normalized.index(source) < stops_normalized.index(destination)
        ):
            matching_routes.append({
                "route_number": route["route_number"],
                "stops": route["stops"],
                "path_coordinates": route["path_coordinates"]
            })
    return matching_routes

@app.route('/api/find_routes', methods=['POST'])
def find_routes():
    data = request.get_json()
    source = data.get('source')
    destination = data.get('destination')

    if not source or not destination:
        return jsonify({"message": "Source and destination are required"}), 400

    results = find_bus_routes(source, destination)
    return jsonify(results)

if __name__ == '_main_':
    app.run(debug=True, port=5000)