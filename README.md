# [break;](https://atom.io/packages/break)

[![Gitter chat](https://badges.gitter.im/Frozenfire92/break.png)](https://gitter.im/Frozenfire92/break)

> An [Atom](https://atom.io/) package to remind you to [get up](https://www.youtube.com/watch?v=X2W3aG8uizA), move around, and take a break. Inspired by [Workrave](http://www.workrave.org/), [countless articles](https://www.google.ca/#q=sitting+harmful), and my sore hips.

![break screenshot](https://github.com/Frozenfire92/break/raw/master/screenshot.png)

-----


## Install

Command Line
```bash
apm install break
```

Or through atom
```
Command Palette ➔ Settings View: Install Packages ➔ Break
```

## Features

- [x] Customizable micro and macro break schedule. Micro are shorter breaks that occur more often. Macro are longer breaks that occur less.
- [x] Full screen break message that prevents you from further coding.
- [x] Optional notifications 1 minute before each break starts.
- [x] Displays the current micro break count and remaining break time in the status bar. ![Status Bar Screenshot](https://github.com/Frozenfire92/break/raw/master/screenshot1.png)

## Package Settings

- *Enable Micro Breaks* - boolean :
  Enable the micro break functionality
- **Macro Break Configuration**
  - *Enable Notifications* - boolean :
  Get a notification 1 minute before each macro break
  - *Duration* - integer :
  Duration in minites of each macro break
  - *Interval* - integer :
  Time in minites between each macro break
- **Micro Break Configuration**
  - *Enable Notifications* - boolean :
  Get a notification 1 minute before each micro break
  - *Duration* - integer :
  Duration in minites of each micro break
  - *Interval* - integer :
  Time in minites between each micro break
  - *Amount* - integer :
  Amount of micro breaks before the macro break starts

#### Settings Example

```
break:
    enabledMicroBreaks: true
    macroBreak:
      duration: 10
      enableNotifications: false
      interval: 60
    microBreak:
      amount: 5
      duration: 5
      enableNotifications: false
      interval: 30
```
