
# Butler
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> My personal Butler in slack

![search and download example](assets/images/butler_screenshot.png)<br>
Always wanted your own butler? Now you can!

## Features
Butler has the following features:
- :car: Traffic information (Netherlands)
- :sunny: Weather forecast

## Usage
Butler is listening to the following commands / messages. It can depend per command where its available. Most of them work over per direct message.

### Traffic
**Available in:** Direct message. <br>
Trigger: `!traffic`

To get the latest traffic information of the dutch roads.

### Traffic filter
**Available in:** Direct message. <br>
Trigger: `!traffic <roadnumber>` _(e.g. !traffic a1)_

Same functionality as `!traffic` but lets you add a filter to it.

### Weather forecast
**Available in:** Direct message. <br>
Trigger: `!weather`

Get a weather forecast of the upcoming week, including today.

### Weather forecast for location
**Available in:** Direct message. <br>
Trigger: `!weather <location>` _(e.g. !weather Amsterdam)_

Get the weather forecast for a specific location.

### Chuck norris jokes
**Available in:** Direct message. <br>
Trigger: `!chuck`

### yo momma jokes
**Available in:** Direct message. <br>
Trigger: `!momma`

Get a random yo momma joke

## Run
To start the Butler simply run the start script inside the bin directory:
```
$ ./bin/start
```
Or `npm install` and `npm start` to launch the bot!

### Docker
There is a Dockerfile if you want to build a docker image yourself. Run the following inside the project directory to build the image:
```
$ docker build -t butler .
```
And launch it with the following command:
```
$ docker run -d --name butler butler
```

## Configuration
Configuration of your bot can either be done using a config file or pass environment variables.

### File
In the `config` folder there is a `config.json.example` file you can copy and rename to `config.json`. Once configured you are ready to start the bot.

### Environment variables
If a config file is not ideal for your setup use environment variables. You can see in the table which env var to use for each config value.

| Description | ENV | Required |
|-------------|-----|----------|
| The slack token for this slackbot | BL_SLACK_KEY | ✓ |
| The name of the slackbot | BL_SLACK_NAME | ✓ |
| Forecast.IO Api key | BL_WEATHER_KEY | ✓ |
| Default location | BL_WEATHER_LAT | ✓ |
| Default location | BL_WEATHER_LONG | ✓ |
