"use strict";
//fetching elements from DOM and declaring global variables
const timeEl = document.querySelector(".time-display");
const startBtnEl = document.getElementById("start-btn");
const stopBtnEl = document.getElementById("stop-btn");
const resetBtnEl = document.getElementById("reset-btn");

//included audio effects for clock ticking and stop buttons
const clickAudio = new Audio();
clickAudio.src = "./assets/click.mp3";
const stopAudio = new Audio();
stopAudio.src = "./assets/stop.mp3";

let seconds = 0;
let intervalId = null;

//event listener for start,stop and reset buttons
startBtnEl.addEventListener("click", start);
stopBtnEl.addEventListener("click", stop);
resetBtnEl.addEventListener("click", reset);

//update timer function to tick up and display the correct time
function updateTime() {
  seconds++;
  clickAudio.play();
  let hours = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds - hours * 3600) / 60);
  let second = seconds % 60;

  //making sure the time is displayed in 00:00:00 formate
  if (second < 10) second = "0" + second;
  if (mins < 10) mins = "0" + mins;
  if (hours < 10) hours = "0" + hours;

  timeEl.innerText = `${hours}:${mins}:${second}`;
}

//start button functionality
function start() {
  if (intervalId) {
    return;
  }
  if (startBtnEl.innerText === "RESUME") {
    startBtnEl.innerText = "START";
  }
  intervalId = setInterval(updateTime, 1000);
}

//stop button functionality
function stop() {
  stopAudio.play();
  clearInterval(intervalId);
  startBtnEl.innerText = "RESUME";
  intervalId = null;
}

//reset button functionality
function reset() {
  stop();
  if (startBtnEl.innerText === "RESUME") {
    startBtnEl.innerText = "START";
  }
  seconds = 0;
  timeEl.innerText = "00:00:00";
}
