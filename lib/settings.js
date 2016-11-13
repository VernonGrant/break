'use babel';

export default {

    config: {

        enabledMicroBreaks: {
            title: 'Enable Micro Breaks',
            description: 'Enable the micro break functionality',
            type: 'boolean',
            default: false,
            order: 1
        },

        macroBreak: {
            title: 'Macro Break Configuration',
            description: 'Configure all the settings related to macro breaks',
            type: 'object',
            order: 2,
            properties: {
                enableNotifications: {
                    title: 'Enable Notifications',
                    description: 'Get a notification 1 minute before each macro break',
                    type: 'boolean',
                    default: true,
                    order: 1
                },
                duration: {
                    title: 'Duration',
                    description: 'Duration in minites of each macro break',
                    type: 'integer',
                    default: 10,
                    minimum: 1,
                    maximum: 1439,
                    order: 2
                },
                interval: {
                    title: 'Interval',
                    description: 'Time in minites between each macro break',
                    type: 'integer',
                    default: 60,
                    minimum: 2,
                    order: 3
                }
            }
        },

        microBreak: {
            title: 'Micro Break Configuration',
            description: 'Configure all the settings related to micro breaks',
            type: 'object',
            order: 3,
            properties: {
                enableNotifications: {
                    title: 'Enable Notifications',
                    description: 'Get a notification 1 minute before each micro break',
                    type: 'boolean',
                    default: true,
                    order: 1
                },
                duration: {
                    title: 'Duration',
                    description: 'Duration in minites of each micro break',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    maximum: 1439,
                    order: 2
                },
                interval: {
                    title: 'Interval',
                    description: 'Time in minites between each mico break',
                    type: 'integer',
                    default: 30,
                    minimum: 2,
                    maximum: 1439,
                    order: 3
                },
                amount: {
                    title: 'Amount',
                    description: 'Amount of micro breaks before the macro break starts',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    order: 4
                }
            }
        }
    },

    quotes: [
        "A goal is a dream with a deadline. – Napoleon Hill",
        "Nine people can’t make a baby in a month. – Fred Brooks",
        "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. – Martin Golding",
        "Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program. – Linus Torvalds",
        "If you cannot do great things, do small things in a great way. – Napoleon Hill",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
        "Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed? – Steve McConnell",
        "The most important property of a program is whether it accomplishes the intention of its user. – C.A.R. Hoare",
        "Tests are stories we tell the next generation of programmers on a project. – Roy Osherove",
        "Many people tend to look at programming styles and languages like religions: if you belong to one, you cannot belong to others. But this analogy is another fallacy. – Niklaus Wirth",
        "When something is important enough, you do it even if the odds are not in your favor. – Elon Musk",
        "On my business card, I am a corporate president. In my mind, I am a game developer. But in my heart, I am a gamer. – Satoru Iwata",
        "The programmers of tomorrow are the wizards of the future. – Gabe Newell",
        "It’s not a bug – it’s an undocumented feature. – Microsoft",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. – Brian W. Kernighan",
        "Learning to write programs stretches your mind, and helps you think better, creates a way of thinking about things that I think is helpful in all domains. – Bill Gates"
    ]

};
