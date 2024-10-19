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

    const spin = spinner(); 
    spin.start();
    await sleep(3 * one_second_of_sleep);
    spin.stop();
}


async function main() {
    // Removing all existing text from the terminal window
    console.clear();



    const QAs = [
        new Question(
            "Cum se transmite o cerere ARP?",
            "Prin broadcast in reteaua locala",
            [
                "Direct spre destinatia cu adresa IP cunoscuta",
                "Direct spre destinatia cu adresa MAC cunoscuta"
            ],
            "Cererea ARP este trimisa prin broadcast in reteaua locala,\nastfel incat toate dispozitivele din retea sa o primeasca\nsi sa poata actualiza tabelele lor ARP cu adresa MAC corespunzatoare pentru adresa IP specificata in cerere."
        ),
        new Question(
            "Ce tip de canal poate fi folosit pentru un protocol Stop and wait?",
            "Half duplex sau full duplex",
            [
            "Orice fel de canal de comunicatie",
            "Simplex",
            "Simplex sau half duplex",
            "Doar full duplex"
            ],
            "Un canal half duplex sau full duplex poate fi folosit pentru un protocol Stop and Wait. Protocolul Stop and Wait necesita ca receptorul sa confirme primirea fiecarui pachet trimis de emitator, prin urmare, emitatorul si receptorul nu trebuie sa trimita simultan."
        ),
        new Question(
            "Care din urmatoarele metode NU este corecta pentru a determina inceputul si finalul unui cadru la nivelul legatura de date?",
            "Inserarea de caractere de control in interiorul corpului cadrului pentru a escapa caracterele.",
            [
            "Caractere STX si ETX care incadreaza cadrul",
            "Adaugarea in header a unui camp cu dimensiunea in bytes a cadrului"
            ],
            "Caracterele STX si ETX sau adaugarea unui camp cu dimensiunea in bytes a cadrului sunt metode corecte pentru a determina inceputul si finalul unui cadru la nivelul legatura de date. Inserarea de caractere de control in interiorul corpului cadrului pentru a escapa caracterele nu este o metoda corecta, deoarece poate aparea o problema de ambiguitate atunci cand datele din corpul cadrului contin accidental aceleasi secvente de caractere ca cele folosite ca si caractere de control."
        ),
        new Question(
            "Ce se foloseste pentru a marca un pachet IPv4 care nu se poate fragmenta?",
            "flag-ul DF",
            [
            "campul offset",
            "flag-ul MF",
            "toate pachetele IPv4 se pot fragmenta"
            ],
            "Pentru a marca un pachet IPv4 care nu se poate fragmenta se foloseste flag-ul DF (Don't Fragment). Acesta este setat in header-ul pachetului si indica faptul ca pachetul nu poate fi fragmentat pe parcursul tranzitarii retelei. In cazul in care o retea intermediara nu poate trimite pachetul fara sa-l fragmenteze, acesta va fi eliminat si va fi trimis un mesaj ICMP (Internet Control Message Protocol) de tipul 'Destination Unreachable - Fragmentation Needed and Don't Fragment Bit Set'."
        ),
        new Question(
            "Pentru ce nu poate fi folosit protocolul ICMP?",
            "ARP",
            ["traceroute", "aflare path MTU", "ping"],
            "Protocolul ICMP (Internet Control Message Protocol) poate fi folosit pentru a efectua diverse operatiuni de diagnostice in retele, cum ar fi ping, traceroute sau aflare path MTU. Cu toate acestea, ICMP nu poate fi folosit pentru a rezolva adrese MAC in adrese IP, ceea ce inseamna ca nu poate fi folosit pentru ARP (Address Resolution Protocol). Pentru a rezolva adresele MAC, este nevoie de un protocol precum ARP sau NDP (Neighbor Discovery Protocol) pentru IPv6."
        ),
        new Question(
            "Protocolul IP garanteaza primirea corecta a pachetelor la destinatie?",
            "Nu",
            ["Da"],
            "Protocolul IP (Internet Protocol) nu garanteaza primirea corecta a pachetelor la destinatie. Acesta este un protocol de livrare nesigur, ceea ce inseamna ca nu exista garantii ca un pachet va ajunge la destinatie, sau ca va ajunge in ordinea corecta. In schimb, IP se bazeaza pe alte protocoale, cum ar fi TCP sau UDP, pentru a oferi servicii de transport sigure, cu control de flux si erori de transmisie."
        ),
        new Question(
            "Care din metodele de retransmisie pentru fereastra glisanta asigura faptul ca receiver-ul primeste cadrele corecte in ordine?",
            "Go Back n",
            ["Selective repeat", "Ambele variante"],
            "Metoda de retransmisie Go Back n asigura faptul ca receiver-ul primeste cadrele corecte in ordine. Aceasta metoda presupune ca receptorul confirma primirea pachetelor printr-un mesaj ACK (Acknowledgement), iar daca un pachet este pierdut sau corupt, toate pachetele ulterioare sunt ignorate. In schimb, metoda Selective Repeat permite retransmiterea unor pachete individuale care s-au pierdut sau au fost corupte, fara a afecta celelalte pachete, insa aceasta metoda nu garanteaza faptul ca pachetele vor fi receptionate in ordine."
        ),
        new Question(
            "Ce se intampla in cadrul unui protocol cu fereastra glisanta cand sender-ul primeste un ACK pentru un cadru din fereastra sa?",
            "Shifteaza fereastra si trimite urmatorul cadru doar daca este ACK pentru primul cadru din fereastra",
            [
            "Asteapta si restul cadrelor ACK",
            "Shifteaza fereastra si trimite urmatorul cadru doar daca este ACK pentru ultimul cadru din fereastra",
            "Shifteaza fereastra si trimite urmatoarele cadre"
            ],
            "Intr-un protocol cu fereastra glisanta, sender-ul muta fereastra la dreapta si trimite urmatorul cadru numai daca primeste un ACK pentru primul cadru din fereastra."
        ),
        new Question(
            "Ce fel de adrese se folosesc pentru protocolul Ethernet?",
            "adrese MAC",
            ["nu se folosesc adrese", "adrese IP"],
            "Protocolul Ethernet foloseste adrese MAC pentru a identifica dispozitivele in retea."
        ),
        new Question(
            "Catre care next_hop se trimite un pachet daca sunt mai multe potriviri in tabela de rutare?",
            "longest prefix match",
            [
            "shortest prefix match",
            "first prefix match",
            "no prefix match",
            "all prefix match"
            ],
            "Cand exista mai multe potriviri in tabela de rutare pentru adresa de destinatie a unui pachet, se va folosi potrivirea cu cel mai lung prefix, cunoscuta si sub numele de longest prefix match."
        ),
        new Question(
            "Care nivel al stivei de protocoale ISO OSI se ocupa de corectia erorilor si controlul fluxului pe un canal de comunicatie?",
            "Nivelul legatura de date",
            ["Nivelul aplicatie", "Nivelul fizic", "Nivelul retea"],
            "Nivelul legatura de date (Layer 2) este responsabil pentru gestionarea transferului fiabil de date intre doua noduri adiacente pe o retea de comunicatii. Acest nivel se ocupa de corectarea erorilor si de controlul fluxului pe un canal de comunicare."
        ),
        new Question(
            "Cum se realizeaza incapsularea pentru trimiterea unui pachet IPv4?",
            "pachetul IPv4 este in payload-ul cadrului Ethernet",
            [
                "cadrul Ethernet este in interiorul pachetului IPv4",
                "Nu au nici o legatura",
                "Trebuie folosit un cadru PPPoE"
            ],
            "Pentru a transmite un pachet IPv4 pe o retea Ethernet, acesta trebuie incapsulat intr-un cadrul Ethernet. In acest caz, pachetul IPv4 va fi pus in payload-ul cadrului Ethernet si se va adauga un antet Ethernet care va contine adresele MAC ale dispozitivelor sursa si destinatie."
        ),
        new Question(
            "Cum se aplica masca de retea pentru verificarea intr-o tabela de rutare?",
            ["AND"],
            ["SUM", "OR", "XOR"],
            "Pentru a verifica daca o adresa IP se afla intr-o anumita retea, se aplica masca de retea la adresa IP utilizand operatia AND. Rezultatul va fi adresa de retea corespunzatoare adresei IP date, care va fi cautata in tabela de rutare."
        ),
        new Question(
            "In ce fel de algoritm de dirijare poate aparea problema numararii la infinit?",
            "Distance vector",
            [ "Link state", "Nu este posibil a numararea la infinit" ],
            "Problema numararii la infinit poate aparea in algoritmul de dirijare Distance Vector. In aceasta situatie, doua sau mai multe rutere se trimit reciproc in circulatie informatii despre costul rutei, fara a ajunge la o solutie de dirijare."
        ),
        new Question(
            "Ce fel de zone pot exista in cadrul unui Autonomous system (AS)?",
            "o zona backbone si mai multe zone stub",
            [
                "nu exista zone",
                "toate zonele sunt la fel",
                "o zona stub si mai multe zone backbone"
            ],
            "In cadrul unui Autonomous System (AS) poate exista o zona backbone si mai multe zone stub. Zona backbone este responsabila pentru dirijarea traficului intre zonele stub, iar zonele stub sunt conectate la zona backbone si nu dirijeaza traficul prin ele."
        ),
        new Question(
            "Ce se intampla in cazul unui protocol de tip Stop and wait daca se pierde un mesaj de la sender la receiver?",
            "Sender-ul va retrimite ultimul mesaj dupa timeout",
            [
                "Se blocheaza si transmisia este intrerupta",
                "Receiver-ul trimite un NACK daca nu primeste urmatorul cadru"
            ],
            "In cazul unui protocol de tip Stop and Wait, daca un mesaj este pierdut, sender-ul va retrimite ultimul mesaj dupa ce a expirat timeout-ul."
        ),
        new Question(
            "La nivelul retea, cum se poate asigura faptul ca pachetele ajung la destinatie in aceeasi ordine in care au fost trimise?",
            "Circuite virtuale",
            [ "Nu se poate garanta ordinea pachetelor", "Datagrame" ],
            "Circuitele virtuale asigura ca pachetele ajung la destinatie in aceeasi ordine in care au fost trimise, deoarece pachetele sunt transmise pe acelasi traseu fix, intr-o anumita ordine, si sunt numerotate in consecinta. "
        ),
        new Question(
            "Cum este impartita o adresa IP in adresa de retea si adresa de host?",
            "Prefixul este adresa de retea, sufixul este adresa pentru host",
            [
                "Prefixul este adresa pentru host, sufixul este adresa de retea",
                "Nu exista o impartire"
            ],
            "Prefixul adresei IP identifica adresa de retea, in timp ce sufixul identifica adresa de gazda. Adresa de retea identifica o retea, in timp ce adresa de gazda identifica un dispozitiv specific din acea retea. "
        ),
        new Question(
            "Ce nu este posibil printr-un canal half-duplex?",
            "Transfer de date in ambele sensuri simultan",
            [
                "Transfer de date in ambele sensuri",
                "Orice fel de transfer de date",
                "Corectia erorilor"
            ],
            "Un canal half-duplex permite transferul de date in ambele sensuri, dar nu in acelasi timp, deoarece transmisia este alternativa. Din acest motiv, transferul de date in ambele sensuri simultan nu este posibil prin canalul half-duplex. "
        ),
        new Question(
            "Care din metodele de retransmisie pentru fereastra glisanta asigura faptul ca se trimite un minim de cadre duplicate?",
            "Selective repeat",
            ["Ambele variante", "Go back n"],
            "Selective repeat este o metoda de retransmisie pentru fereastra glisanta care asigura faptul ca se trimite un minim de cadre duplicate. Acest lucru este realizat prin faptul ca receptorul retine pachetele primite corect, iar expeditorul retransmite doar pachetele care nu au fost confirmate. "
        ),
        new Question(
            "Cine fragmenteaza pachetele in cadrul protocolului IPv6?",
            "Sursa datelor",
            [
                "Router-ul care trebuie sa transmita un pachet spre o retea cu MTU prea mic",
                "Router-ul care trebuie sa transmita un pachet spre o retea cu MTU prea mare",
                "Destinatia"
            ],
            "In protocolul IPv6, fragmentarea pachetelor este realizata de catre sursa datelor, nu de catre routere, atunci cand pachetul este prea mare pentru a fi transmis printr-un link cu MTU (Maximum Transmission Unit) mai mic decat dimensiunea pachetului."
        ),
        new Question(
            "Care este valoarea bitului de paritate impara pentru sirul 1011101?",
            "0",
            ["1"],
            "Pentru a calcula bitul de paritate impara, se numara numarul de biti cu valoarea 1 din sirul de biti, apoi se adauga un bit cu valoarea 0 sau 1 astfel incat numarul total de biti cu valoarea 1 sa fie impar. In cazul acestui sir de biti, exista 4 biti cu valoarea 1, deci bitul de paritate impara trebuie sa fie 0, astfel incat numarul total de biti cu valoarea 1 sa fie impar (5)."
        ),
        new Question(
            "Daca la nivelul legaturii de date se realizeaza transmisia transparenta prin caractere de control, ce se trimite daca in campul de date apare caracterul DLE?",
            "DLE DLE",
            ["ETX", "DLE", "Nu se poate trimite"],
            "In transmisia transparenta prin caractere de control, anumite caractere (cum ar fi caracterul DLE - Data Link Escape) sunt considerate speciale si pot fi confundate cu caractere de control. Pentru a evita acest lucru, se foloseste o tehnica numita 'byte stuffing', prin care caracterul special este inlocuit cu o secventa de caractere care nu poate fi confundata cu caractere de control. In cazul caracterului DLE, se trimite secventa DLE DLE in locul acestuia."
        ),
        new Question(
            "De ce este necesara fragmentarea pachetelor IP?",
            "Dimensiunea pachetului este mai mare decat MTU",
            [
                "Dimensiunea pachetului este mai egala cu MTU",
                "Dimensiunea pachetului este mai mic decat MTU"
            ],
            "Fragmentarea pachetelor IP este necesara atunci cand dimensiunea pachetului este mai mare decat MTU-ul (Maximum Transmission Unit) al unei retele intermediare prin care trebuie sa treaca pachetul, astfel incat pachetul trebuie fragmentat in bucati mai mici care pot fi transmise prin intermediul retelei respective."
        ),
        new Question(
            "In cadrul CIDR, ce semnificatie are notatia de forma 141.85.99.142/24 ?",
            "Adresa retelei are 24 biti si adresa host-ului are 8 biti",
            [
                "Adresa este locala",
                "Adresa retelei are 8 biti si adresa host-ului are 24 biti",
                "/24 marcheaza numarul total de biti ai adresei IP."
            ],
            "In notarea CIDR, numarul de biti din adresa de retea este specificat prin /24, ceea ce inseamna ca primii 24 de biti ale adresei IP reprezinta adresa de retea, iar ultimii 8 biti reprezinta adresa host-ului."
        ),
        new Question(
            "Cine fragmenteaza pachetele in cadrul protocolului IPv4?",
            "Router-ul care trebuie sa transmita un pachet spre o retea cu MTU prea mic",
            [
                "Sursa datelor",
                "Router-ul care trebuie sa transmita un pachet spre o retea cu MTU prea mare",
                "Destinatia"
            ],
            "In cadrul protocolului IPv4, pachetele sunt fragmentate de router-ul care trebuie sa transmita un pachet spre o retea cu MTU prea mic pentru dimensiunea pachetului IP respectiv. Astfel, router-ul va fragmenta pachetul in bucati mai mici care sa poata fi transmise prin reteaua respectiva."
        ),
        new Question(
            "Cum este marcat ultimul fragment dintr-un pachet?",
            "Flag-ul MF are valoarea 0",
            [
                "Flag-ul MF are valoarea 1",
                "Flag-ul DF are valoarea 1",
                "Offset-ul are valoarea 0"
            ],
            "Ultimul fragment dintr-un pachet este marcat prin faptul ca flag-ul MF (More Fragments) are valoarea 0, indicand ca nu mai sunt fragmente ulterioare."
        ),
        new Question(
            "Ce reprezinta campul offset dintr-un fragment IP?",
            "Pozitia fragmentului in pachet ca grup de 8 bytes",
            [
                "Pozitia fragmentului in pachet (numarul de bytes)",
                "Nu are legatura cu fragmentarea",
                "Pozitia fragmentului in pachet ca grup de 16 bytes"
            ],
            "Campul offset dintr-un fragment IP indica pozitia fragmentului in pachetul original, exprimata ca un numar de grupuri de 8 octeti (64 de biti)."
        ),
        new Question(
            "In cadrul unui protocol cu fereastra glisanta, ce rol are cadrul de tip RR?",
            "Receive Ready",
            [
                "Rank Reset",
                "Response Resent",
                "Reply Rejected",
                "Reverse Run"
            ],
            "Cadrul de tip RR (Receive Ready) este folosit intr-un protocol cu fereastra glisanta pentru a confirma primirea cu succes a unui anumit numar de pachete. Acesta poate fi trimis de catre receptor catre emitator pentru a indica ca poate primi mai multe pachete."
        ),
        new Question(
            "Daca la nivelul legatura de date se realizeaza transmisia transparenta prin caractere de control, care este caracterul folosit pentru escapare?",
            "DLE",
            ["ETX", "STX", "IDK"],
            "DLE este caracterul folosit pentru escapare la nivelul legaturii de date in cazul transmisiei transparente prin caractere de control."
        ),
        new Question(
            "Care nivel al stivei de protocoale ISO OSI se ocupa de determinarea rutei de la sursa la destinatie prin noduri intermediare?",
            "Nivelul retea",
            [
                "Nivelul fizic",
                "Nivelul legatura de date",
                "Nivelul aplicatie"
            ],
            "Nivelul retea este cel care se ocupa de determinarea rutei de la sursa la destinatie prin intermediul nodurilor, prin utilizarea de protocoale de rutare si adresare."
        ),
        new Question(
            "Pe ce se bazeaza protocolul RIP?",
            "Distance vector",
            ["Link state", "Nici una din cele mentionate"],
            "Check this link: https://www.geeksforgeeks.org/routing-information-protocol-rip/"
        ),
        new Question(
            "Cum se foloseste protocolul ICMP pentru a afla Path MTU?",
            "Se trimit pachete ICMP din ce in ce mai mici pana cand nu se mai primeste o eroare",
            [
                "Se trimit pachete ICMP din ce in ce mai mari pana cand se primeste o eroare",
                "Path MTU nu are nici o legatura cu protocolul ICMP"
            ],
            "Pentru a afla Path MTU, se trimit pachete ICMP cu flag-ul 'Don't Fragment' setat si cu o dimensiune tot mai mare. In cazul in care unul dintre pachete nu poate fi transmis din cauza dimensiunii prea mari, reteaua va returna un mesaj ICMP 'Fragmentation Needed and Don't Fragment was Set'. Acest mesaj va indica dimensiunea maxima a pachetelor care pot fi transmise pe acea ruta."
        ),
        new Question(
            "Un protocol Stop and Wait are nevoie neaparat de un canal de transmisie Full Duplex?",
            "Nu. Este suficient un canal Half Duplex",
            ["Da", "Nu. Este suficient un canal Simplex"],
            ""
        ),
        new Question(
            "Daca folosim un nr de secventa pe 4 biti, care este dimensiunea maxima a unei ferestre glisante pentru un transmitator?",
            "15",
            ["12", "16", "8"],
            "https://gateoverflow.in/111757/calculate-the-maximum-window-size"
        ),
        new Question(
            "La nivelul legatura de date, pentru un protocol cu fereastra glisanta, cand se shifteaza fereastra transmitatorului?",
            "Cand a primit ACK pentru primul cadru din fereastra de transmisie",
            [
                "Dupa ce a terminat de trimis cadrele din fereastra",
                "Cand a primit ACK pentru oricare cadru din fereastra de transmisie"
            ],
            "Intr-un protocol cu fereastra glisanta, transmiterea datelor se face prin transmiterea unui numar fix de cadre (fereastra de transmisie) inainte de asteptarea confirmarii primirii acestora de catre receptor. Dupa ce primul cadru din fereastra de transmisie este trimis, transmitatorul asteapta sa primeasca un ACK (acuzatie de primire) pentru acest cadru inainte de a deplasa fereastra de transmisie catre urmatoarele cadre. In acest fel, transmitatorul poate asigura ca receptorul a primit primul cadru si poate accepta noile cadre din fereastra de transmisie pentru transmitere. Dupa primirea ACK-ului pentru primul cadru, fereastra de transmisie se deplaseaza cu un cadru si procesul se repeta pana cand toate cadrele din fereastra de transmisie au fost trimise si confirmate de receptor."
        ),
        new Question(
            "Cand se reasambleaza fragmentele unui pachet IP?",
            "La destinatia finala",
            [
                "La intrarea in prima retea cu un MTU suficient de mare",
                "Dupa traversarea unui numar fix de retele"
            ],
            ""
        ),
        new Question(
            "Ce garanteaza transmisia datelor folosind datagrame?",
            "Nici una din aceste variante",
            [
                "Ordinea pachetelor ajunse la destinatie este aceeasi ordine in care au fost transmise",
                "Canal de comunicatie prin care datele sigur ajung la destinatie",
                "Corectitudinea datelor trimise"
            ],
            ""
        ),
        new Question(
            "Intre metodele de retransmisie 'Go back N' si 'Selective repeat' care are nevoie sa pastreze intr-un buffer cadrele primite corect la receptor, pana se primesc si cadrele retransmise.",
            ["Selective repeat"],
            ["Nici unul", "Amandoua", "Go back N"],
            ""
        ),
        new Question(
            "Cum influenteaza fragmentarea pachetelor daca este setat flagul DF din header-ul IPv4?",
            "Pachetul nu se va fragmenta niciodata",
            [
                "Pachetul trebuie neaparat sa fie fragmentat",
                "Nu are legatura cu fragmentarea"
            ],
            ""
        ),
        new Question(
            "Ce se intampla la protocolul Ethernet daca 2 host-uri incearca sa trimita in acelasi timp?",
            "Are loc o coliziune si host-urile vor incerca sa retrimita dupa un timp",
            [
                "Datele ajung corect la destinatie.",
                "Se trimite un NACK pentru unul din transmitatori."
            ],
            ""
        ),
        new Question(
            "La nivelul legatura de date, daca vrem sa trimitem un payload de 16 biti, de cati biti de control avem nevoie pentru metoda Hamming?",
            "5",
            ["3", "4", "6"],
            "Pentru a utiliza metoda Hamming pentru a trimite un payload de 16 biti, avem nevoie de 5 biti de control. Aceasta se datoreaza faptului ca metoda Hamming utilizeaza o matrice de control cu 5 linii si 16 coloane pentru a verifica si a corecta erorile de transmisie. Deci, raspunsul corect este 5."
        ),
        new Question(
            "Prin folosirea unui checksum este posibila:",
            "Detectia erorilor de transmisie",
            [
                "Fixarea lungimii maxime a unui cadru.",
                "Detectia si corectarea erorilor de transmisie"
            ],
            "Checksum este o metoda utilizata pentru detectarea erorilor de transmisie in cadrul unui set de date. Se calculeaza o suma de control (checksum) pentru datele transmise si se compara cu o suma de control primita de la receptor. Daca cele doua sunt diferite, se poate presupune ca au aparut erori de transmisie in datele transmise. Nu este posibila detectarea si corectarea erorilor de transmisie utilizand doar checksum. Pentru a corecta erorile de transmisie, este necesara utilizarea altor metode, cum ar fi codurile de corectie a erorilor. De asemenea, checksum nu fixeaza lungimea maxima a unui cadru."
        )
    ]

   
	intro(`${color.bgMagenta(color.black(" Welcome! Let's test your knowledge about Network Protocols! "))}`);

    const spin = spinner(); 
    
    spin.start();
    await sleep(5 * one_second_of_sleep);
    spin.stop();


    for (const question of QAs) {
        // 'await' make the function in the same order they are written in code
        await askQuestion(question);
    }
}

main().catch(console.error);
