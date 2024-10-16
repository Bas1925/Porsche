from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for session management

# Connect to MongoDB (Local or Atlas)
client = MongoClient("mongodb://localhost:27017/")  # Update with your connection string if needed
db = client.porsche  # Create or select your database

# Route to render the main page (your HTML file with forms)
@app.route('/')
def home():
    logged_in = session.get('logged_in', False)  # Get 'logged_in' state from the session
    username = session.get('username', None)  # Get the username if logged in
    return render_template('index.html', logged_in=logged_in, username=username)


# Sign Up Route
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['signup-username']
    email = request.form['signup-email']
    password = request.form['signup-password']

    # Check if user already exists
    existing_user = db.users.find_one({"username": username})
    if existing_user:
        return jsonify({"error": "Username already exists. Please choose a different one."})

    # Insert user data into MongoDB
    db.users.insert_one({
        "username": username,
        "email": email,
        "password": password
    })

    return jsonify({"message": "User created successfully!"})


# Sign In Route
@app.route('/signin', methods=['POST'])
def signin():
    username = request.form['username']
    password = request.form['password']

    # Check if the user exists in MongoDB
    user = db.users.find_one({"username": username, "password": password})

    if user:
        session['logged_in'] = True  # Set session variable when logged in
        session['username'] = username  # Optionally, store the username
        return jsonify({"message": f"Welcome back, {username}!"})
    else:
        return jsonify({"error": "Invalid username or password"})


# Order Route
@app.route('/order', methods=['POST'])
def order():
    data = request.get_json()  # Parse JSON data
    print(data)  # Debugging: Print received data to the terminal

    if 'logged_in' not in session or not session['logged_in']:
        return jsonify({"error": "You need to sign in to place an order."})

    try:
        # Insert order data into MongoDB
        db.orders.insert_one({
            "full_name": data['fullName'],
            "email": data['email'],
            "phone": data['phone'],
            "address": data['address'],
            "city": data['city'],
            "zip_code": data['zip'],
            "country": data['country'],
            "trim": data['trim'],
            "color": data['color'],
            "interior_color": data['interiorColor'],
            "payment_method": data['paymentMethod'],
            "delivery_date": data['deliveryDate'],
            "comments": data['comments']
        })
        return jsonify({"message": "Order placed successfully!"})
    except Exception as e:
        print(f"Error: {e}")  # Print any errors for debugging
        return jsonify({"error": f"Error inserting order: {e}"})


# Demo Drive Route
@app.route('/demo-drive', methods=['POST'])
def demo_drive():
    data = request.get_json()  # Parse JSON data from the request
    print(data)  # Debugging: print the received data

    if 'logged_in' not in session or not session['logged_in']:
        return jsonify({"error": "You need to sign in to schedule a demo drive."})

    try:
        # Insert demo drive data into MongoDB
        db.demo_drives.insert_one({
            "first_name": data['firstName'],
            "last_name": data['lastName'],
            "email": data['email'],
            "phone": data['phone'],
            "zip_code": data['zipCode'],
            "energy_products": data['energyProducts']  # This is a boolean (checkbox)
        })
        return jsonify({"message": "Demo drive scheduled successfully!"})
    except Exception as e:
        print(f"Error: {e}")  # Print the error message for debugging
        return jsonify({"error": f"Error inserting demo drive: {e}"})


# Logout Route
@app.route('/logout')
def logout():
    # Always display the logout icon
    if 'logged_in' in session and session['logged_in']:
        session.clear()  # Clear session data if the user is logged in
        return jsonify({"message": "You have been logged out successfully!"})
    else:
        return jsonify({"message": "You are already logged out."})


if __name__ == '__main__':
    app.run(debug=True)
