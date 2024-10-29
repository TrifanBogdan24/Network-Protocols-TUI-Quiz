# Network Protocols `TUI` Quiz

> 👨‍💻 A `CLI TUI` tool written in `JavaScript` with `NodeJS`,
> leveraging the power of [`@clack/prompts`](https://github.com/bombshell-dev/clack.git)
> to deliver an interactive quiz experience right in your terminal.

## Preview/Results

![gif](Images/PreviewVideos/preview.gif)


`@clack/prompts` elements:
![img](Images/PreviewImages/img-01.png)
![img](Images/PreviewImages/img-02.png)
![img](Images/PreviewImages/img-03.png)
![img](Images/PreviewImages/img-04.png)
![img](Images/PreviewImages/img-05.png)
![img](Images/PreviewImages/img-06.png)
![img](Images/PreviewImages/img-07.png)


## About the Quiz

Welcome to the **Network Protocols `TUI` Quiz** -
a fun and engaging way to challenge your understanding of essential networking concepts!
This quiz is designed for everyone,
whether you’re a novice eager to learn or a seasoned professional wanting to brush up on your knowledge.

### How It Works
- **Customizable Questions**: Choose how many questions you want to answer, from a minimum of 1 to a maximum of 43.
- **Randomized Order**: Each quiz session will feature a shuffled order of questions, and the multiple-choice answers will also be presented in random order. This adds an extra layer of challenge and keeps the quiz fresh!
- **Instant Feedback**: After each question, receive immediate feedback:
  - **Correct Answers**: If you answer correctly, you’ll see "Correct!" in green, along with a score that reflects your performance based on the total questions selected.
  - **Incorrect Answers**: If your answer is wrong, "Incorrect!" will be displayed in red, accompanied by a helpful explanation of the correct answer.
- **Final Score Assessment**: At the end of the quiz, your total score will be shown. A score above 5 will be presented in green, while lower scores will appear in red, giving you a clear indication of your performance.

Dive in and see how well you know your network protocols!

## Running the `TUI` Tool

Setting up a project with `npm` can often be a nightmare for most of us,
especially when it involves wrestling with configuration files and `NodeJS` dependencies.

To simplify the process, I’ve created a 🐳 `Docker image` that automates everything for you.

Just run the [`run.sh`](run.sh) script in your terminal:
```bash
$ source run.sh
# or
$ chmod +x run.sh
$ ./run.sh
```

This script generates a `Docker image` based on the [`Dockerfile`](Dockerfile) from the working directory.
It launches the **CLI TUI** quiz within a `Docker container` that has all dependencies pre-installed.
Once you complete the quiz, the `Docker container` is automatically removed.

> NOTE:
> If you need to exit the quiz prematurely by pressing `CTRL-C`, remember to remove the `Docker image` manually.


## Running the Tool Anywhere

You can easily run the quiz from any directory by following these steps:

```bash
$ docker pull bgd24/network-protocols-interactive-tui-quiz

# Append the alias to your shell configuration file (~/.bashrc, ~/.zshrc, ~/.profile)
$ echo 'alias TUI_quiz="docker run --rm -it bgd24/network-protocols-interactive-tui-quiz"' >> ~/.bashrc
$ source ~/.bashrc

$ type TUI_quiz
alias TUI_quiz="docker run --rm -it bgd24/network-protocols-interactive-tui-quiz"

# Now you can run TUI_quiz from any directory
$ TUI_quiz
```

