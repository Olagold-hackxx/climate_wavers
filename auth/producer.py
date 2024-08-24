import pika
import requests
import json

# Step 1: Fetch aggregated data from your API
api_url = "http://127.0.0.1:8000/api/v1/user-data/"
response = requests.get(api_url)

if response.status_code == 200:
    data = response.json()
else:
    print(f"Failed to fetch data from API. Status code: {response.status_code}")
    exit(1)

# Step 2: Set up the RabbitMQ connection and channel
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Step 3: Declare a queue (if it doesn't exist)
channel.queue_declare(queue='user_data_queue')

# Step 4: Send (publish) the data to RabbitMQ
channel.basic_publish(
    exchange='',
    routing_key='user_data_queue',
    body=json.dumps(data)
)

print(" [x] Sent aggregated data to RabbitMQ")

# Step 5: Close the connection
connection.close()
