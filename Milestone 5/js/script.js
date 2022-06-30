var app = new Vue({
    el: '#app',
    data: {
        currentActiveUser: 0,
        userInputText: '',
        userSearch: '',
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
        getCurrentActiveUser(index) {
            this.currentActiveUser = index;
        },
        // milestone 3
        getUserInput() {
            const userInputTextTrimmed = this.userInputText.trim()
            if (userInputTextTrimmed.length > 0) {
                this.contacts[this.currentActiveUser].messages.push(
                    {
                    date: dayjs().format("DD/MM/YYYY HH:mm:ss"),
                    text: userInputTextTrimmed,
                    status: 'sent',
                    hidden: true
                    }
                );
                this.userInputText = '';
            };
            setTimeout(this.getAnswer, 1000);
        },
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
        getUserSearch() {
            const userSearchLower = this.userSearch.toLowerCase();
            this.contacts.forEach((contact) => {
                const elementTextLower = contact.name.toLowerCase();

                if(elementTextLower.includes(userSearchLower)) {
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
            // this.userSearch = ''; (keyup.enter)
        },
        deleteMessage(index) {
            this.contacts[this.currentActiveUser].messages.splice(index, 1)
        },
        getOnlyOne(type) {
            if(type.hidden === true) {
                this.contacts[this.currentActiveUser].messages.forEach((element) => {
                    this.isActive = element;
                    this.isActive.hidden = true;
                });
                type.hidden = !this.isActive.hidden;
            } else {
                type.hidden = true;
            }
        }
    }
})

