import keyboard
import mouse
import time

keystrokes = []
mouse_clicks = []

def on_key(event):
    keystrokes.append(event.name)
    print(f"Keystroke: {event.name}")

def on_click(event):
    mouse_clicks.append(event.button)
    print(f"Mouse click: {event.button}")

keyboard.hook(on_key)
mouse.on_click(on_click)

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Exiting...")

print("Keystrokes captured:")
print(keystrokes)

print("Mouse clicks captured:")
print(mouse_clicks)
