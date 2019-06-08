sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get install tmux
sudo apt-get install pigpio
sudo apt-get install git
cd 
wget https://nodejs.org/dist/latest-v9.x/node-v9.11.2-linux-armv6l.tar.gz
tar -xvf node-v9.11.2-linux-armv6l.tar.gz
cd node-v9.11.2-linux-armv6l
sudo cp -R * /usr/local/
cd ..
rm node-v9.11.2-linux-armv6l.tar.gz
rm -rf node-v9.11.2-linux-armv6l
git clone https://github.com/getraid/raspberrypi-led-node-and-webserver /home/pi/raspberrypi-led-node-and-webserver
cd /home/pi/raspberrypi-led-node-and-webserver
npm install 
Cy='\033[1;36m'
RED='\033[0;35m'
NC='\033[0m' # No Color
clear
echo Installation complete.
echo -------------------------------------------------------------------
echo To start, type in ${Cy}tmux${NC} and then ${Cy}cd raspberrypi-led-node-and-webserver${NC} and then ${Cy}sudo node ws.js ${NC}
echo To run continued in background press ${RED} CTRL + b ${NC} and then ${RED} d ${NC} and close the window/session
echo To re-enter the tmux-session type ${Cy}tmux a${NC}
echo To exit ${RED} CTRL + c ${NC} and type ${Cy} exit ${NC}
rm script.sh


# to configure the pins of your led stripe:
# nano ws.js
# edit under red-led, green-led, and blue-led the x value with your pin
# var led1-3 = new Gpio(x, { mode: Gpio.OUTPUT });
# look for a pinout (eg: google raspi zero pinout) and we are using the GPIOXX numbers
# the standard layout is:
# red: gpio pin 27 / pincount 11
# green: gpio pin 17 / pincount 13
# blue: gpio pin 22 / pincount 15
# ground: gpio pin 4 / pincount 7
# now enter the (local) ip of the pi in your webbrowser. For example: http://192.168.178.45/
