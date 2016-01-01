## **Overview**

Jarvis is an assistant that enables users to speak natural voice commands to their computer in order to help them with a number of common tasks to increase their productivity.

## **Taking a look at Jarvis’ features**

Below, you’ll find the list of options Jarvis provides and a high level description of what you’ll find in each section.

![Home Section](https://www.dropbox.com/s/tu9h13owhx6jgtn/Screen%20Shot%202015-12-29%20at%2010.47.53%20AM.png?dl=1)

### **Home**

Start giving voice commands to Jarvis to get started.

### **Packages**

Find a list of existing voice commands and the corresponding command that will be executed. You’ll also find that Jarvis provides incredible flexibility which allows you to customize the existing commands, add new commands and add new packages.


Take a look at the **[Commands and Packages](#commandPackages)** section for more details.

### **Settings**

Customize Jarvis’ default configuration to match your preferences. Take a look at the **[Settings and Configuration](#settingsConfiguration)** section for more details about each option.

### **Contact**

Here you can find how to contact us if you have any suggestions to improve the application or if you need assistance with Jarvis.

### **About**

If you want to know more about us, visit the **About** section.

##Getting Started with Jarvis <a id="gettingStarted"></a>

Welcome! You’ve installed Jarvis in your computer. Now it’s time for Jarvis to help you with a number of tasks you do on a regular basis.

This guide will help you get started in a few minutes so that you can start enjoying the benefits of having Jarvis installed.

**1. Launch the application**

Navigate to your Applications folder or the folder where Jarvis was installed and double click it. You can also use Spotlight Search to search for Jarvis in your computer. Press **Command + Space** and type the name of the application. When it pops up, press enter.

![Spotlight](https://www.dropbox.com/s/00biqwwq9s1kxy3/Screen%20Shot%202015-12-29%20at%2011.24.01%20AM.png?dl=1)

**2. Give Jarvis a voice command**

Jarvis sits in the background, waiting to get called when you need him. After you launch the application, you’ll see the application’s homepage and a tray icon which indicates Jarvis started listening for your voice commands.


![Tray Icon](https://www.dropbox.com/s/agxtz4l1j6gyx93/Screen%20Shot%202015-12-29%20at%203.12.30%20PM.png?dl=1)


Jarvis comes with a list of default voice commands. Take a look at Appendix A for a complete list. You can also check the Packages section to see some of these out of the box voice commands.

## **Guides and Tutorials**

Now that you’ve browsed Jarvis’ features, you can start customizing Jarvis using these guides and tutorials


# **Commands and Packages** <a id="commandPackages"></a>

### **Add a command** <a id="addCommand"></a>

Jarvis provides the option to manually add new voice commands with its corresponding bash command to the application. To do this, follow the steps below:

1. Launch the application. Refer to the **[Getting Started](#gettingStarted)** section for more information.

2. Navigate to the **Packages** section of the application by clicking the **Packages** button. ![packages button](https://www.dropbox.com/s/jl4bdr4ih67itp2/Screen%20Shot%202015-12-29%20at%203.13.43%20PM.png?dl=1)

3. Once you’re in the **Packages** section, click the **+** symbol on the top right corner. ![plus button](https://www.dropbox.com/s/0ts2ld6d5yen23b/Screen%20Shot%202015-12-29%20at%203.16.07%20PM.png?dl=1)

4. After you click the **+** symbol, you’ll see a new empty field added at the end of the **Commands** table. Add the **voice command** in the **command** field and the **bash command** in the **action** field. ![add command field](https://www.dropbox.com/s/7gqtkqfvyxydwkl/Screen%20Shot%202015-12-29%20at%203.54.24%20PM.png?dl=1)

  Below you can find an example of how this would look like:
  ![new command](https://www.dropbox.com/s/75bv011gxd1g9ns/Screen%20Shot%202015-12-29%20at%203.57.47%20PM.png?dl=1)

### **Delete a command**

If a command is no longer useful for you, you can delete it from the list of commands by following these steps:

1. Launch the application. Refer to the **[Getting Started](#gettingStarted)** section for more information.

2. Navigate to the **Packages** section of the application by clicking the **Packages** button as explained in the **[Add a command](#addCommand)** section.

3. Click the **X** icon next to the command you want to delete.
![delete](https://www.dropbox.com/s/c5u386ces5fh9cz/Screen%20Shot%202015-12-29%20at%203.31.59%20PM.png?dl=1)

### **Load a package**

When you need to add a set of commands, Jarvis provides a feature that allows you to load a package to the application.

A **package** is a JSON file that contains the voice command and its corresponding bash command.

To load a package to the application, follow these steps:

1. Launch the application. Refer to the **[Getting Started](#gettingStarted)** section for more information.

2. Navigate to the **Packages** section of the application by clicking the **Packages** button as explained in the **[Add a command](#addCommand)** section.

3. Click the **Load Package** button on the bottom right corner of the **Packages** section. ![load package button](https://www.dropbox.com/s/jtjzi2hhieey8dm/Screen%20Shot%202015-12-29%20at%203.47.52%20PM.png?dl=1)

4. Search and select the JSON file you want to load and click **Open**.

**NOTE:** The commands in the JSON file won't be displayed in the **Commands** table.

# **Settings and Configuration** <a id="settingsConfiguration"></a>

Jarvis' settings allow you to customize the default configuration to match your needs.

### **Change Jarvis's name**

The default name the application responds to is **Jarvis**. However, this can be customized to any name you want. To do this, follow these steps:

1. Launch the application. Refer to the **[Getting Started](#gettingStarted)** section for more information.

2. Navigate to the **Settings** section of the application by clicking the **Settings** button. ![settings button](https://www.dropbox.com/s/s5b0aznpzrcmsfn/Screen%20Shot%202015-12-30%20at%2010.30.24%20AM.png?dl=1)

3. Type the new name inside the **Call Name** text box. ![call name](https://www.dropbox.com/s/u3hukehjtdxkeyn/Screen%20Shot%202015-12-30%20at%2010.34.58%20AM.png?dl=1)

4. Click on the **Save** button on the bottom right corner.

Try it out! Instead of Jarvis, call the application by the new name you gave it.

### **Change the voice recognition's thresholds**

In the **Settings** section, you'll find two thresholds:

1. **Exact Matching Threshold:** This threshold determines how similar the speech to text translation has to be with the phrase saved in the application so that it is considered an exact match.

2. **Close Matching Threshold:** Jarvis also has the ability to guess the phrase when there is no exact match. The **Close Matching Threshold** determines how similar it has to be to an existing phrase/command for Jarvis to suggest it.

To change these thresholds, follow the steps below:

1. Launch the application. Refer to the **[Getting Started](#gettingStarted)** section for more information.

2. Navigate to the **Settings** section of the application by clicking the **Settings** button. ![settings button](https://www.dropbox.com/s/s5b0aznpzrcmsfn/Screen%20Shot%202015-12-30%20at%2010.30.24%20AM.png?dl=1)

3. Click on the handle of the threshold you want to modify. ![slider handle](https://www.dropbox.com/s/pmurax1g2qxwez5/Screen%20Shot%202015-12-30%20at%2010.53.48%20AM.png?dl=1)

4. While the handle is being clicked, slide it to the preferred value.

5. Click the **Save** button on the bottom right corner to save the new value of the threshold(s).
