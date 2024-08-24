import requests
import pika
import json

# Step 1: Fetch Aggregated Data from API
api_url = "http://127.0.0.1:8000/api/v1/user-data/"
response = requests.get(api_url)

if response.status_code == 200:
    data = response.json()  # Assuming the API returns JSON data
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
    exit()

# Step 2: Setup RabbitMQ Connection
rabbitmq_host = 'localhost'  # Adjust as needed
connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
channel = connection.channel()

# Declare a queue (name it appropriately for your use case)
queue_name = 'aggregated_data_queue'
channel.queue_declare(queue=queue_name, durable=True)

# Step 3: Push Data to RabbitMQ Queue
message = json.dumps(data)
channel.basic_publish(
    exchange='',
    routing_key=queue_name,
    body=message,
    properties=pika.BasicProperties(
        delivery_mode=2,  # Make the message persistent
    ))

print("Aggregated data pushed to RabbitMQ queue.")

# Step 4: Close Connection
connection.close()
