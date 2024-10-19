#!/usr/bin/env node

import { intro, note, outro, select, spinner, text } from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';
import color from 'picocolors';


const one_second_of_sleep = 1000

class Question {
    constructor(questionText, rightAnswear, wrongAnswears, feedback) {
        this.questionText = questionText
        this.rightAnswear = rightAnswear
        this.wrongAnswears = wrongAnswears
        this.feedback = feedback
    }
}



async function askQuestion(question) {
    const ans = [question.rightAnswear].concat(question.wrongAnswears);
    const userAnswear = await select({
        message: question.questionText,
        options: ans.map(answer => ({ value: answer }))
    });


    // string comparison
    if (userAnswear === question.rightAnswear) {
        note('Corect!\n\n+ 10 pct')
    } else {
        note(`Incorect!\n\nFEEDBACK:\n${question.feedback}`);
    }
}


async function main() {
    // Removing all existing text from the terminal window
    console.clear();




    const q01 = new Question(
        "Cum se transmite o cerere ARP?",
        "Prin broadcast in reteaua locala",
        [
            "Direct spre destinatia cu adresa IP cunoscuta",
            "Direct spre destinatia cu adresa MAC cunoscuta"
        ],
        "Cererea ARP este trimisă prin broadcast în rețeaua locală,\nastfel încât toate dispozitivele din rețea să o primească\nși să poată actualiza tabelele lor ARP cu adresa MAC corespunzătoare pentru adresa IP specificată în cerere."
    );

    
	intro(`${color.bgMagenta(color.black(' Welcome. Let us find out how much of a CLI expert you REALLY are. '))}`);
    
    const spin = spinner(); 
    
    spin.start();
    // await sleep(5 * one_second_of_sleep);
    spin.stop();

    askQuestion(q01)
}

main().catch(console.error);
