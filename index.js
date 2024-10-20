#!/usr/bin/env node

import { intro, isCancel, cancel, note, outro, select, spinner, text } from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';
import color from 'picocolors';


const oneSecondOfSleep = 1000;




class Question {
    constructor(questionText, rightAnswear, wrongAnswears, feedback) {
        this.questionText = questionText
        this.rightAnswear = rightAnswear
        this.wrongAnswears = wrongAnswears
        this.feedback = feedback
    }
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectRandomQuestions(questions, numberOfSelections) {
    // Using a copy to avoid modifying the original list
    const shuffled = shuffleArray([...questions]);
    return shuffled.slice(0, numberOfSelections);
}



async function askQuestion(question, numQuestions, statistics) {
    statistics.question_idx += 1;


    const allAnswears = [question.rightAnswear].concat(question.wrongAnswears);
    const shuffledAnswears = shuffleArray([...allAnswears])

    const userAnswear = await select({
        message: `${statistics.question_idx}) ${question.questionText}`,
        options: shuffledAnswears.map(answer => ({ value: answer }))
    });


    if (isCancel(userAnswear)) {
        cancel('Process was interrupted!');
        note(
            `Number of completed questions: ${statistics.question_idx - 1}\n` +
            `Number of correct questions: ${statistics.count_correct_questions}\n` + 
            `Number of incorrect questions: ${statistics.count_incorrect_questions}`
        );
        process.exit(0);
    }


    // string comparison
    if (userAnswear === question.rightAnswear) {
        note(
            `Correct!\n\n` +
            // displaying the floating number with exact 2 decimals
            `+ ${(100 / numQuestions).toFixed(2)} pct`
        );
        statistics.count_correct_questions += 1;
    } else {
        if (question.feedback === "") {
            // No feedback
            note('Incorrect!');
        } else {
            // THe question has a feedback
            note(`Incorrect!\n\nFEEDBACK:\n${question.feedback}`);
        }
        statistics.count_incorrect_questions += 1;
    }


    if (statistics.question_idx != numQuestions) {
        const spin = spinner(); 
        spin.start('Next ');
        // 'await' makes the functions run in the same order they are written in code
        await sleep(3 * oneSecondOfSleep);

        if (isCancel(spin)) {
            note(
                `Process was interrupted.\n` + 
                `Number of completed questions: ${statistics.question_idx}\n` +
                `Number of correct questions: ${statistics.count_correct_questions}`
            );
            process.exit(0);
        }
        
        spin.stop('Next');
    }
    

}



async function getNumOfQuestions() {
    const numQuestions = await text({
        message: "First of all... How many questions would you like to be asked? (1 - 43)",
        placeholder: "",
        initialValue: '',
        validate(inputStr) {
            const num = parseInt(inputStr, 10);

            if (inputStr === '') return "Empty input!";
            else if (!Number.isInteger(num) || inputStr.trim() !== num.toString()) return "The input must be a INTEGER!";
            else if (num < 1 || num > 43) return "The input number must be in the range [1, 43]!";
        },
    });


    if (isCancel(numQuestions)) {
        cancel('Process was interrupted!');
        process.exit(0);
    }

    return numQuestions
}


function generateQuestions() {
    return [
        // Question 01
        new Question(
            // Question's text:
            "How is an ARP request transmitted?",
            // Correct answer:
            "By broadcast in the local network",
            // List of incorrect questions:
            [
                "Directly to the destination with a known IP address",
                "Directly to the destination with a known MAC address"
            ],
            // Explanation:
            "The ARP request is sent by broadcast in the local network,\n" + 
            "so that all devices on the network receive it\n" +
            "and can update their ARP tables with the correct MAC address for the IP address specified in the request."
        ),
        // Question 02
        new Question(
            // Question's text:
            "What type of channel can be used for a Stop and Wait protocol?",
            // Correct answer:
            "Half duplex or full duplex",
            // List of incorrect questions:
            [
                "Any type of communication channel",
                "Simplex",
                "Simplex or half duplex",
                "Only full duplex"
            ],
            // Explanation:
            "A half duplex or full duplex channel can be used for a Stop and Wait protocol.\n" +
            "This protocol requires the receiver to acknowledge the receipt of each packet sent by the sender,\n" +
            "so the sender and receiver must not transmit simultaneously."
        ),
        // Question 03
        new Question(
            // Question's text:
            "Which of the following methods is NOT correct for determining the start and end of a frame at the data link layer?",
            // Correct answer:
            "Inserting control characters inside the frame body to escape characters.",
            // List of incorrect questions:
            [
                "STX and ETX characters framing the frame",
                "Adding a field in the header with the frame size in bytes"
            ],
            // Explanation:
            "STX and ETX characters or adding a field with the frame size in bytes\n" +
            "are correct methods to determine the start and end of a frame at the data link layer.\n" +
            "Inserting control characters inside the frame body to escape characters is not a correct method,\n" +
            "as there can be ambiguity if the data in the frame body accidentally contains the same sequences as the control characters."
        ),
        // Question 04
        new Question(
            // Question's text:
            "What is used to mark an IPv4 packet that cannot be fragmented?",
            // Correct answer:
            "The DF flag",
            // List of incorrect questions:
            [
                "The offset field",
                "The MF flag",
                "All IPv4 packets can be fragmented"
            ],
            // Explanation:
            "To mark an IPv4 packet that cannot be fragmented, the DF (Don't Fragment) flag is used.\n" +
            "It is set in the packet header and indicates that the packet cannot be fragmented during transit.\n" +
            "If an intermediate network cannot forward the packet without fragmenting it, the packet will be dropped,\n" +
            "and an ICMP (Internet Control Message Protocol) message of type 'Destination Unreachable - Fragmentation Needed and Don't Fragment Bit Set' will be sent."
        ),
        // Question 05
        new Question(
            // Question's text:
            "What can't the ICMP protocol be used for?",
            // Correct answer:
            "ARP",
            // List of incorrect questions:
            ["traceroute", "path MTU discovery", "ping"],
            // Explanation:
            "The ICMP (Internet Control Message Protocol) can be used for various diagnostic tasks in networks,\n" +
            "such as ping, traceroute, or path MTU discovery.\n" +
            "However, ICMP cannot be used to resolve MAC addresses to IP addresses,\n" +
            "which means it cannot be used for ARP (Address Resolution Protocol).\n" +
            "To resolve MAC addresses, a protocol like ARP or NDP (Neighbor Discovery Protocol) for IPv6 is needed."
        ),
        // Question 06
        new Question(
            // Question's text:
            "Does the IP protocol guarantee the correct delivery of packets to the destination?",
            // Correct answer:
            "No",
            // List of incorrect questions:
            ["Yes"],
            // Explanation:
            "The IP (Internet Protocol) does not guarantee the correct delivery of packets to the destination.\n" +
            "It is an unreliable delivery protocol, meaning there are no guarantees that a packet will reach its destination or that it will arrive in the correct order.\n" +
            "Instead, IP relies on other protocols, such as TCP or UDP, to provide reliable transport services with flow and error control."
        ),
        // Question 07
        new Question(
            // Question's text:
            "Which of the retransmission methods for sliding window ensures that the receiver gets the correct frames in order?",
            // Correct answer:
            "Go Back n",
            // List of incorrect questions:
            ["Selective repeat", "Both options"],
            // Explanation:
            "The Go Back n retransmission method ensures that the receiver gets the correct frames in order.\n" +
            "This method requires the receiver to acknowledge the received packets with an ACK (Acknowledgement),\n" +
            "and if a packet is lost or corrupted, all subsequent packets are ignored.\n" +
            "In contrast, the Selective Repeat method allows the retransmission of individual lost or corrupted packets without affecting the others,\n" +
            "but it does not guarantee that the packets will be received in order."
        ),
        // Question 08
        new Question(
            // Question's text:
            "What happens in a sliding window protocol when the sender receives an ACK for a frame in its window?",
            // Correct answer:
            "It shifts the window and sends the next frame only if it is an ACK for the first frame in the window",
            // List of incorrect questions:
            [
                "It waits for the rest of the ACKs",
                "It shifts the window and sends the next frame only if it is an ACK for the last frame in the window",
                "It shifts the window and sends the next frames"
            ],
            // Explanation:
            "In a sliding window protocol, the sender shifts the window to the right and sends the next frame\n" +
            "only if it receives an ACK for the first frame in the window."
        ),
        // Question 09
        new Question(
            // Question's text:
            "What type of addresses are used for the Ethernet protocol?",
            // Correct answer:
            "MAC addresses",
            // List of incorrect questions:
            ["No addresses are used", "IP addresses"],
            // Explanation:
            "The Ethernet protocol uses MAC addresses to identify devices on the network."
        ),
        // Question 10
        new Question(
            // Question's text:
            "To which next_hop is a packet sent if there are multiple matches in the routing table?",
            // Correct answer:
            "Longest prefix match",
            // List of incorrect questions:
            [
                "Shortest prefix match",
                "First prefix match",
                "No prefix match",
                "All prefix match"
            ],
            // Explanation:
            "When there are multiple matches in the routing table for the destination address of a packet,\n" +
            "the LONGEST PREFIX MATCH is used."
        ),
        // Question 11
        new Question(
            // Question's text:
            "Which layer of the ISO OSI protocol stack is responsible for error correction and flow control on a communication channel?",
            // Correct answer:
            "Data link layer",
            // List of incorrect questions:
            ["Application layer", "Physical layer", "Network layer"],
            // Explanation:
            "The data link layer (Layer 2) is responsible for managing the reliable transfer of data\n" + 
            "between two adjacent nodes on a communication network.\n" +
            "This layer handles error correction and flow control on a communication channel."
        ),
        // Question 12
        new Question(
            // Question's text:
            "How is encapsulation done for sending an IPv4 packet?",
            // Correct answer:
            "The IPv4 packet is in the payload of the Ethernet frame",
            // List of incorrect questions:
            [
                "The Ethernet frame is inside the IPv4 packet",
                "They are unrelated",
                "A PPPoE frame must be used"
            ],
            // Explanation:
            "To send an IPv4 packet over an Ethernet network, it must be encapsulated in an Ethernet frame.\n" +
            "In this case, the IPv4 packet will be placed in the payload of the Ethernet frame,\n" +
            "and an Ethernet header will be added containing the MAC addresses of the source and destination devices."
        ),
        // Question 13
        new Question(
            // Question's text:
            "How is the network mask applied for checking in a routing table?",
            // Correct answer:
            "AND",
            // List of incorrect questions:
            ["SUM", "OR", "XOR"],
            // Explanation:
            "To check if an IP address is in a particular network, the network mask is applied to the IP address using the AND operation.\n" +
            "The result will be the network address corresponding to the given IP address, which will be looked up in the routing table."
        ),
        // Question 14
        new Question(
            // Question's text:
            "In what type of routing algorithm can the count-to-infinity problem occur?",
            // Correct answer:
            "Distance vector",
            // List of incorrect questions:
            [ "Link state", "It is not possible to have a count-to-infinity" ],
            // Explanation:
            "The count-to-infinity problem can occur in the Distance Vector routing algorithm.\n" +
            "In this situation, two or more routers repeatedly exchange information about the cost of a route without reaching a routing solution."
        ),
        // Question 15
        new Question(
            // Question's text:
            "What kind of areas can exist within an Autonomous System (AS)?",
            // Correct answer:
            "One backbone area and multiple stub areas",
            // List of incorrect questions:
            [
                "There are no areas",
                "All areas are the same",
                "One stub area and multiple backbone areas"
            ],
            // Explanation:
            "Within an Autonomous System (AS), there can be one backbone area and multiple stub areas.\n" +
            "The backbone area is responsible for routing traffic between stub areas,\n" +
            "and the stub areas are connected to the backbone area and do not route traffic through them."
        ),
        // Question 16
        new Question(
            // Question's text:
            "What happens in a Stop and Wait protocol if a message from sender to receiver is lost?",
            // Correct answer:
            "The sender will resend the last message after a timeout",
            // List of incorrect answers:
            [
                "It gets blocked and the transmission is interrupted",
                "The receiver sends a NACK if it does not receive the next frame"
            ],
            // Explanation:
            "In a Stop and Wait protocol, if a message is lost, the sender will resend the last message after the timeout has expired."
        ),
        // Question 17
        new Question(
            // Question's text:
            "At the network level, how can it be ensured that packets arrive at the destination in the same order they were sent?",
            // Correct answer:
            "Virtual circuits",
            // List of incorrect answers:
            [
                "Packet order cannot be guaranteed",
                "Datagrams"
            ],
            // Explanation:
            "Virtual circuits ensure that packets arrive at the destination in the same order they were sent,\n" +
            "because packets are transmitted on the same fixed route in a certain order and are numbered accordingly."
        ),
        // Question 18
        new Question(
            // Question's text:
            "How is an IP address divided into a network address and a host address?",
            // Correct answer:
            "The prefix is the network address, and the suffix is the address for the host",
            // List of incorrect answers:
            [
                "The prefix is the address for the host, and the suffix is the network address",
                "There is no division"
            ],
            // Explanation:
            "The prefix of the IP address identifies the network address, while the suffix identifies the host address.\n" +
            "The network address identifies a network, while the host address identifies a specific device within that network."
        ),
        // Question 19
        new Question(
            // Question's text:
            "What is not possible through a half-duplex channel?",
            // Correct answer:
            "Simultaneous data transfer in both directions",
            // List of incorrect answers:
            [
                "Data transfer in both directions",
                "Any kind of data transfer",
                "Error correction"
            ],
            // Explanation:
            "A half-duplex channel allows data transfer in both directions,\n" +
            "but not at the same time, since the transmission is alternated.\n" +
            "For this reason, simultaneous data transfer in both directions is not possible through a half-duplex channel."
        ),
        // Question 20
        new Question(
            // Question's text:
            "Which retransmission method for sliding window ensures that a minimum number of duplicate frames are sent?",
            // Correct answer:
            "Selective repeat",
            // List of incorrect answers:
            [
                "Both options",
                "Go back n"
            ],
            // Explanation:
            "Selective repeat is a sliding window retransmission method\n" +
            "that ensures that a minimum number of duplicate frames are sent.\n" +
            "This is achieved by the receiver holding the correctly received packets,\n" +
            "and the sender retransmitting only the packets that have not been acknowledged."
        ),
        // Question 21
        new Question(
            // Question's text:
            "Who fragments packets in the IPv6 protocol?",
            // Correct answer:
            "The data source",
            // List of incorrect answers:
            [
                "The router that needs to send a packet to a network with a too small MTU",
                "The router that needs to send a packet to a network with a too large MTU",
                "The destination"
            ],
            // Explanation:
            "In the IPv6 protocol, packet fragmentation is performed by the data source, not by routers,\n" +
            "when the packet is too large to be transmitted through a link with an MTU (Maximum Transmission Unit) smaller than the packet size."
        ),
        // Question 22
        new Question(
            // Question's text:
            "What is the value of the odd parity bit for the string 1011101?",
            // Correct answer:
            "0",
            // List of incorrect answers:
            [
                "1"
            ],
            // Explanation:
            "To calculate the odd parity bit, count the number of bits with a value of 1 in the bit string,\n" +
            "then add a bit with the value of 0 or 1 so that the total number of bits with a value of 1 is odd.\n" +
            "In this case, there are 4 bits with a value of 1, so the odd parity bit must be 0,\n" +
            "ensuring that the total number of bits with a value of 1 is odd (5)."
        ),
        // Question 23
        new Question(
            // Question's text:
            "If transparent transmission is performed at the data link layer using control characters, what is sent if the DLE character appears in the data field?",
            // Correct answer:
            "DLE DLE",
            // List of incorrect answers:
            [
                "ETX",
                "DLE",
                "Cannot be sent"
            ],
            // Explanation:
            "In transparent transmission using control characters, certain characters\n" +
            "(such as the DLE character - Data Link Escape) are considered special and may be confused with control characters.\n" +
            "To avoid this, a technique called 'byte stuffing' is used, where the special character is replaced with\n" +
            "a character sequence that cannot be confused with control characters.\n" +
            "In the case of the DLE character, the sequence DLE DLE is sent instead."
        ),
        // Question 24
        new Question(
            // Question's text:
            "Why is IP packet fragmentation necessary?",
            // Correct answer:
            "The packet size is greater than the MTU",
            // List of incorrect answers:
            [
                "The packet size is equal to the MTU",
                "The packet size is less than the MTU"
            ],
            // Explanation:
            "IP packet fragmentation is necessary when the packet size is greater than the MTU (Maximum Transmission Unit)\n" +
            "of an intermediate network through which the packet must pass,\n" +
            "so the packet must be fragmented into smaller pieces that can be transmitted through that network."
        ),
        // Question 25
        new Question(
            // Question's text:
            "In CIDR, what does the notation of the form 141.85.99.142/24 signify?",
            // Correct answer:
            "The network address has 24 bits and the host address has 8 bits",
            // List of incorrect answers:
            [
                "The address is local",
                "The network address has 8 bits and the host address has 24 bits",
                "/24 marks the total number of bits in the IP address."
            ],
            // Explanation:
            "In CIDR notation, the number of bits in the network address is specified by '/24',\n" + 
            "meaning the first 24 bits of the IP address represent the network address,\n" +
            "while the last 8 bits represent the HOST address."
        ),
        // Question 26
        new Question(
            // Question's text:
            "Who fragments packets in the IPv4 protocol?",
            // Correct answer:
            "The router that needs to send a packet to a network with a MTU that is too small",
            // List of incorrect answers:
            [
                "The data source",
                "The router that needs to send a packet to a network with a MTU that is too large",
                "The destination"
            ],
            // Explanation:
            "In the IPv4 protocol, packets are fragmented by the router that needs to send a packet\n" +
            "to a network with a MTU that is too small for the size of the IP packet.\n" + 
            "Thus, the router will fragment the packet into smaller pieces that can be transmitted through that network."
        ),
        // Question 27
        new Question(
            // Question's text:
            "How is the last fragment of a packet marked?",
            // Correct answer:
            "The MF flag has a value of 0",
            // List of incorrect answers:
            [
                "The MF flag has a value of 1",
                "The DF flag has a value of 1",
                "The offset has a value of 0"
            ],
            // Explanation:
            "The last fragment of a packet is marked by the fact that the MF (More Fragments) flag has a value of 0,\n" +
            "indicating that there are no more subsequent fragments."
        ),
        // Question 28
        new Question(
            // Question's text:
            "What does the offset field in an IP fragment represent?",
            // Correct answer:
            "The position of the fragment in the packet as a group of 8 bytes",
            // List of incorrect answers:
            [
                "The position of the fragment in the packet (number of bytes)",
                "It has nothing to do with fragmentation",
                "The position of the fragment in the packet as a group of 16 bytes"
            ],
            // Explanation:
            "The offset field in an IP fragment indicates the position of the fragment in the original packet,\n"+
            "expressed as a number of groups of 8 octets (64 bits)."
        ),
        // Question 29
        new Question(
            // Question's text:
            "In a sliding window protocol, what is the role of the RR frame?",
            // Correct answer:
            "Receive Ready",
            // List of incorrect answers:
            [
                "Rank Reset",
                "Response Resent",
                "Reply Rejected",
                "Reverse Run"
            ],
            // Explanation:
            "The RR (Receive Ready) frame is used in a sliding window protocol\n" +
            "to confirm the successful receipt of a certain number of packets.\n" +
            "It can be sent by the receiver to the sender to indicate that it can receive more packets."
        ),
        // Question 30
        new Question(
            // Question's text:
            "If data link layer performs transparent transmission through control characters, what is the character used for escape?",
            // Correct answer:
            "DLE",
            // List of incorrect answers:
            ["ETX", "STX", "IDK"],
            // Explanation:
            "DLE is the character used for escape at the data link layer in case of transparent transmission through control characters."
        ),
        // Question 31
        new Question(
            // Question's text:
            "Which layer of the ISO OSI protocol stack is responsible for determining the route from source to destination through intermediate nodes?",
            // Correct answer:
            "Network layer",
            // List of incorrect answers:
            [
                "Physical layer",
                "Data link layer",
                "Application layer"
            ],
            // Explanation:
            "The network layer is responsible for determining the route from source to destination\n" + 
            "through nodes, using routing and addressing protocols."
        ),
        // Question 32
        new Question(
            // Question's text:
            "What does the RIP protocol rely on?",
            // Correct answer:
            "Distance vector",
            // List of incorrect answers:
            ["Link state", "None of the mentioned"],
            // Explanation:
            "Check this link: https://www.geeksforgeeks.org/routing-information-protocol-rip/"
        ),
        // Question 33
        new Question(
            // Question's text:
            "How is the ICMP protocol used to find Path MTU?",
            // Correct answer:
            "ICMP packets are sent smaller and smaller until no error is received",
            // List of incorrect answers:
            [
                "ICMP packets are sent larger and larger until an error is received",
                "Path MTU has nothing to do with the ICMP protocol"
            ],
            // Explanation:
            "To find the Path MTU, ICMP packets are sent with the 'Don't Fragment' flag set and increasing size.\n" +
            "If one of the packets cannot be transmitted due to being too large,\n" +
            "the network will return an ICMP message 'Fragmentation Needed and Don't Fragment was Set'." +
            "This message will indicate the maximum size of packets that can be transmitted on that route."
        ),
        // Question 34
        new Question(
            // Question's text:
            "Does a Stop and Wait protocol necessarily require a Full Duplex transmission channel?",
            // Correct answer:
            "No. A Half Duplex channel is sufficient",
            // List of incorrect answers:
            ["Yes", "No. A Simplex channel is sufficient"],
            // No explanation
            ""
        ),
        // Question 35
        new Question(
            // Question's text:
            "If we use a sequence number of 4 bits, what is the maximum size of a sliding window for a transmitter?",
            // Correct answer:
            "15",
            // List of incorrect answers:
            ["12", "16", "8"],
            // Explanation:
            "See this link: https://gateoverflow.in/111757/calculate-the-maximum-window-size"
        ),
        // Question 36
        new Question(
            // Question's text:
            "At the data link layer, for a sliding window protocol, when does the transmitter shift its window?",
            // Correct answer:
            "When it has received an ACK for the first frame in the transmission window",
            // List of incorrect answers:
            [
                "After it has finished sending the frames in the window",
                "When it has received an ACK for any frame in the transmission window"
            ],
            // Explanation:
            "In a sliding window protocol, data transmission is done by\n" + 
            "sending a fixed number of frames (the transmission window)\n" +
            "before waiting for an acknowledgment of their receipt from the receiver.\n" + 
            "After the first frame in the transmission window is sent,\n" +
            "the transmitter waits to receive an ACK (acknowledgment)\n" +
            "for this frame before moving the transmission window to the next frames.\n" +
            "This way, the transmitter can ensure that the receiver has received the first frame\n" +
            "and can accept new frames from the transmission window for transmission.\n" +
            "After receiving the ACK for the first frame, the transmission window shifts by one frame,\n" +
            "and the process repeats until all frames in the transmission window have been sent and acknowledged by the receiver."
        ),
        // Question 37
        new Question(
            // Question's text:
            "When are the fragments of an IP packet reassembled?",
            // Correct answer:
            "At the final destination",
            // List of incorrect answers:
            [
                "When entering the first network with a sufficiently large MTU",
                "After crossing a fixed number of networks"
            ],
            // No explanation
            ""
        ),
        // Question 38
        new Question(
            // Question's text:
            "What does data transmission using datagrams guarantee?",
            // Correct answer:
            "None of these options",
            // List of incorrect answers:
            [
                "The order of packets arriving at the destination is the same order in which they were transmitted",
                "A communication channel through which data safely reaches its destination",
                "The correctness of the sent data"
            ],
            // No explanation
            ""
        ),
        // Question 39
        new Question(
            // Question's text:
            "Between the retransmission methods 'Go back N' and 'Selective repeat', which one needs to keep correctly received frames in a buffer at the receiver until the retransmitted frames are received?",
            // Correct answer:
            ["Selective repeat"],
            // List of incorrect answers:
            ["None", "Both", "Go back N"],
            // No explanation
            ""
        ),
        // Question 40
        new Question(
            // Question's text:
            "How does packet fragmentation affect if the DF flag is set in the IPv4 header?",
            // Correct answer:
            "The packet will never be fragmented",
            // List of incorrect answers:
            [
                "The packet must be fragmented",
                "It has nothing to do with fragmentation"
            ],
            // No explanation
            ""
        ),
        // Question 41
        new Question(
            // Question's text:
            "What happens in the Ethernet protocol if two hosts try to send at the same time?",
            // Correct answer:
            "A collision occurs and the hosts will attempt to retransmit after some time",
            // List of incorrect answers:
            [
                "Data arrives correctly at the destination.",
                "A NACK is sent for one of the transmitters."
            ],
            // No explanation
            ""
        ),
        // Question 42
        new Question(
            // Question's text:
            "At the data link layer, if we want to send a 16-bit payload, how many control bits do we need for the Hamming method?",
            // Correct answer:
            "5",
            // List of incorrect answers:
            ["3", "4", "6"],
            // Explanation:
            "To use the Hamming method to send a 16-bit payload, we need 5 control bits.\n" +
            "This is because the Hamming method uses a control matrix with 5 rows and 16 columns to check and correct transmission errors.\n" +
            "So, the correct answer is 5."
        ),
        // Question 43
        new Question(
            // Question's text:
            "By using a checksum, it is possible to:",
            // Correct answer:
            "Detect transmission errors",
            // List of incorrect answers:
            [
                "Set the maximum length of a frame.",
                "Detect and correct transmission errors"
            ],
            // Explanation:
           "A checksum is a method used for detecting transmission errors within a set of data.\n" +
           "A checksum is calculated for the transmitted data and compared with a checksum received from the receiver.\n" +
           "If the two are different, it can be assumed that transmission errors have occurred in the transmitted data.\n" +
           "It is not possible to detect and correct transmission errors using only a checksum.\n" +
           "To correct transmission errors, other methods such as error correction codes are required.\n" +
           "Additionally, a checksum does not set the maximum length of a frame."
        )
    ]
}






async function main() {
    // Removing all existing text from the terminal window
    console.clear();

    /*
    * By default, NodeJS accepts 10 listeners and if the program creates more,
    * an error message regarding memory leaks will be generated
    * 
    * If such an error is displayed again, the value of MaxListeners must be increased.
    */
    process.setMaxListeners(50);



    intro(`${color.bgYellowBright(color.black(" Welcome! Let's test your knowledge about Network Protocols! "))}`);


    // 'await' makes the functions run in the same order they are written in code
    const numQuestions = await getNumOfQuestions();



    const spin = spinner();

    spin.start('Generating Q&As for you ');
    // 'await' makes the functions run in the same order they are written in code
    await sleep(3 * oneSecondOfSleep);
    spin.stop('Generating Q&As for you');


    spin.start('Shuffling your Q&As ');
    // 'await' makes the functions run in the same order they are written in code
    await sleep(3 * oneSecondOfSleep);
    spin.stop('Shuffling your Q&As');


    
    const allQAs = generateQuestions();
    const randomQAs = selectRandomQuestions(allQAs, numQuestions)

    let statistics = {
        question_idx: 0,
        count_correct_questions: 0,
        count_incorrect_questions: 0
    }


    for (const question of randomQAs) {
        // 'await' makes the functions run in the same order they are written in code
        await askQuestion(question, numQuestions, statistics);
    }


    const grade = statistics.count_correct_questions / numQuestions * 10

    // ternary if-else
    const final_message = (grade >= 5) ? 'Congrats! You PASSED!' : 'Ohh noo...You FAILED!'


    note(
        `Number of correct questions: ${statistics.count_correct_questions}\n` +
        `Number of incorrect questions: ${statistics.count_incorrect_questions}\n` + 
        `------------------------------------\n` +
        // displaying the floating number with exact 2 decimals
        `Your final grade: ${grade.toFixed(2)}`
    );


    if (grade < 5) {
        outro(`${color.bgRed(color.black(`${final_message}`))}`);
    } else {
        outro(`${color.bgGreen(color.black(`${final_message}`))}`);
    } 

    process.exit(0);

}

main().catch(console.error);

