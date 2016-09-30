'use babel';

export default {

    // Package Configuration
    config: {
        
        macroBreak: {
            title: 'Macro Break Configuration',
            description: 'Configure all the settings related to macro breaks',
            type: 'object',
            properties: {
                duration: {
                    title: 'Duration',
                    description: 'How long should the break be. (minites)',
                    type: 'integer',
                    default: 5,
                    minimum: 1,
                    maximum: 1439
                },
                interval: {
                    title: 'Interval',
                    description: 'How much time before the break starts. (minites)',
                    type: 'integer',
                    default: 25,
                    minimum: 1
                }
            }
        }
    }

};
