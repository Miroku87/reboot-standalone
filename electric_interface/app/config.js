/**
 * Created by Miroku on 13/10/2018.
 */

window.CONFIG = {
    players_init_energy_percentage : 0,
    buttons: [
        {
            text: "Turboascensori palazzi residenziali",
            state_percentage_offset: {
                on: -20,
                idle: 10,
                off: 0
            },
            can_switch_off : true,
            init_state: "off"
        },
        {
            text: "Griglia di intercomunicazione ad ampio raggio",
            state_percentage_offset: {
                on: -8,
                idle: 0,
                off: 0
            },
            can_switch_off : false,
            init_state: "off"
        },
        {
            text: "Sistema di illuminazione stradale d’emergenza",
            state_percentage_offset: {
                on: -10,
                idle: 5,
                off: 0
            },
            can_switch_off : true,
            init_state: "off"
        },
        {
            text: "Alimentazione Impianto idrico",
            state_percentage_offset: {
                on: -5,
                idle: 0,
                off: 0
            },
            can_switch_off : false,
            init_state: "off"
        },
        {
            text: "Sistema difensivo automatico – Sezione Nord",
            state_percentage_offset: {
                on: -50,
                idle: 20,
                off: 0
            },
            can_switch_off : false,
            offline_after_time: 36000, //secondi
            init_state: "off"
        },
        {
            text: "Accesso alla rete locale Ravnet",
            state_percentage_offset: {
                on: -20,
                idle: 0,
                off: 0
            },
            can_switch_off : false,
            init_state: "off"
        },
        {
            text: "Sistema direzionale Synapse",
            state_percentage_offset: {
                on: -5,
                idle: 0,
                off: 0
            },
            can_switch_off : false,
            init_state: "off"
        },
        {
            text: "Impianto controllo Proxy",
            state_percentage_offset: {
                on: -30,
                idle: 10,
                off: 0
            },
            can_switch_off : true,
            init_state: "off"
        },
        {
            text: "Pulsante offine",
            state_percentage_offset: {
                on: 0,
                idle: 0,
                off: 0
            },
            can_switch_off : false,
            init_state: "offline"
        }
    ]
};
