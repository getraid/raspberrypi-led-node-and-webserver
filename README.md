# Raspberry Pi LED-stripe controller with Node running a Webserver
Control LED stripes through your Webbrowser via Websockets from the Pi. 
Also useable with for example C#, to write applications that send the data via websockets: [possible idea](http://www.screenbloom.com/) or to sync it via Logitech-Software via API.

## Showcase:
* to be filled

## Requirements:
* Raspberry Pi 1 model B (tested) up to Raspberry Pi 3 Model B
* Noobs or Rasbian (tested)
* 1 LED stripe with RGB connected on RPi GPIO pins (can be changed at Setup: 6): red: gpio17, green: gpio22, blue: gpio24 (raspberry pi 1b)
* A local network (to reach the pi) and the IP adress of the PI
* A PC with open port 22, to ssh/connect to the pi.

## Setup:
You effectively need to change the **thick** written parts, because they are depending on your setup (GPIO)

1. SSH into your Pi via [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) on Windows or the Terminal on Linux / macOs (`ssh pi@your-pi-local-ip-adress:22`)
2. To update the PI and the repositories itself -> `sudo apt-get update && upgrade --y`
3. Install Node.js shown [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) (I had Node 6.11.4 on my pi)
4. Clone this repo to your pi `git clone https://github.com/getraid/raspberrypi-led-node-and-webserver`
5. Go into the folder `cd raspberrypi-led-node-and-webserver`
6. **Change the RGB pins to the ones that you connected** `nano ws.js`
  * `var led1 = new Gpio(your-gpio-pin-g, { mode: Gpio.OUTPUT });`
  * `var led2 = new Gpio(your-gpio-pin-r, { mode: Gpio.OUTPUT });`
  * `var led3 = new Gpio(your-gpio-pin-b, { mode: Gpio.OUTPUT });`
  * to save changes: *CTRL + X -> Y -> Enter*
7. \* (Change the IP where the websocketserver lies to your Pi's ip `nano ws-client.js`)
  * ` var ws = new WebSocket("ws://your-pi-local-ip-adress:3000");`
  * to save changes: *CTRL + X -> Y -> Enter*
8. Run the script: `sudo node ws` (sudo necessary because of GPIO access and port 80)
9. Open your Webbrowser and enter the IP adress of your pi in the url bar. For example: `http://192.168.178.42/`
10. If the title of the page says *Connected to Server* then you can click on the field with the "FFFFFF" and drag the color slider around.
  * Else check the console of the Pi. Maybe your port is blocked or there is a GPIO error.
  * Used Ports: 80 (webserver) & 3000 (websocketserver)
11. Install tmux to run the script in the background `sudo apt-get install tmux`
  * `tmux`
  * `node ws`
  * *CTRL + B and then press d*
  * You can now close the terminal. To re-enter the tmux session, type `tmux a` 
12. Enjoy your LED-Stripe webcontroller from any device in your local area network
  * It is also possible to start this script running with tmux on the startup of the system -> rc.local. 
  
If you get errors, maybe you need to install pigpio: `sudo apt-get install pigpio`.
\* 7 - Is not necessary anymore, change it if you encounter errors.

## Sidenote:
You'll see the count of users connected in the console, as well as a client number. This number doesn't have a meaning or anything else, it is just a random number, to quickly differenciate which user send what. (for the lulz)
