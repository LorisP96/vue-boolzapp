var app = new Vue({
    el: '#app',
    data: {
        // variabile per selezionare l'oggetto corrente utilizzato
        currentActiveUser: 0,
        // input dell'utente per scrivere un messaggio in chat
        userInputText: '',
        // input testuale per cercare un utente in lista
        userSearch: '',
        // variabile per stabilire un reset di key (js RIGA 116 e RIGA 172)
        isActive: null,
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        // aggiungo una key a tutti gli oggetti per mostrare il pop-up
                        hidden: true
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        hidden: true
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        hidden: true
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        hidden: true
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        hidden: true
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        hidden: true
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        hidden: true
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        hidden: true
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        hidden: true
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        hidden: true
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        hidden: true
                    }
                ],
            },
        ]
    },
    methods: {
        // ottenere l'index attualmente attivo cliccando su un utente (html RIGA 63)
        getCurrentActiveUser(index) {
            this.currentActiveUser = index;
            // reset chevrow, quando ottengo l'index di un oggetto 
            // ogni volta che l'index correntemente attivo cambia,
            // tutte le key 'hidden' in messages non vengono visualizzate (html RIGA 122)
            this.contacts[this.currentActiveUser].messages.forEach((element) => {
                this.isActive = element;
                this.isActive.hidden = true;
            })
        },
        // inviare un messaggio
        getUserInput() {
            // input con trim
            const userInputTextTrimmed = this.userInputText.trim();
            // se l'utente digita almeno 1 carattere push nell'array di messages 
            if (userInputTextTrimmed.length > 0) {
                this.contacts[this.currentActiveUser].messages.push(
                    {
                    date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                    text: userInputTextTrimmed,
                    status: 'sent',
                    hidden: true
                    }
                );
                // reset input
                this.userInputText = '';
                // dopo l'invio di almeno 1 carattere 
                // imposto una funzione dopo 1 secondo (funzione successiva)
                setTimeout(this.getAnswer, 1000);
            };
        },
        // ottengo una risposta
        getAnswer() {
            this.contacts[this.currentActiveUser].messages.push(
                {
                date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                text: 'ok',
                status: 'received',
                hidden: true
                }
            );
        },
        // ottengo un risultato dalla ricerca (html RIGA 55)
        getUserSearch() {
            // imposto l'input in caratteri minuscoli per combaciare la ricerca
            const userSearchLower = this.userSearch.toLowerCase();
            // visualizzo solo gli oggetti che hanno i caratteri del nome inclusi nella input 
            this.contacts.forEach((contact) => {
                const elementTextLower = contact.name.toLowerCase();

                if(elementTextLower.includes(userSearchLower)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
            // non applico il reset this.userSearch = ''; 
            // poichè ho usato keyup anzichè keyup.center
        },
        // visualizzo un pop up per click (html RIGA 120)
        showPopUp(type) {
                if(type.hidden === true) {
                    // reset chevrow;
                    // ogni key 'hidden' di messages diventa true e 
                    // non viene visualizzata prima del click (html RIGA 122)
                    this.contacts[this.currentActiveUser].messages.forEach((element) => {
                        this.isActive = element;
                        this.isActive.hidden = true;
                    });
                    type.hidden = !this.isActive.hidden;
                } else {
                    type.hidden = true;
                };
        },
        // elimino un messaggio (html RIGA 124)
        deleteMessage(index) {
            this.contacts[this.currentActiveUser].messages.splice(index, 1)
        },
    }
})

