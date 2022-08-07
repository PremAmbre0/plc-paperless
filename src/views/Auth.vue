<template>
    <div class="container">
        <div class="auth">
            <div class="header">
                <span class="header-logo">Paperless</span>
                <span class="header-text">Welcome</span>
            </div>
            <v-form class="auth-form">
                <v-text-field outlined v-model="email" type='text' label="Email Address"
                    hint="Enetr a valid email address" :rules="[rules.required]"></v-text-field>
                <v-text-field v-model="password" outlined :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-1"
                    label="Pasword" hint="At least 8 characters" counter @click:append="show = !show">
                </v-text-field>
                <div class="auth-text">Forgot password?</div>
                <v-btn color="#5243AA" elevation="11" dark large width=100%>Continue</v-btn>
            </v-form>
            <div class="auth-text" @click="toggleMode">{{ hintText }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            mode: 'signIn',
            email: '',
            password: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
            }
        }
    },
    computed: {
        hintText() {
            if (this.mode == 'signIn') return "Already Have an Account? Log in"
            else return "Don't have an Account? Sign in"
        }
    },
    methods: {
        toggleMode() {
            this.email = '';
            this.password = '';
            if (this.mode == 'signIn') {
                this.mode = 'LogIn';
            }
            else {
                this.mode = 'signIn';
            }
        }
    },
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap");

.container {
    display: flex;
    width: 100vw;
    justify-content: center;
    margin-top: 10vh;
}

.auth {
    min-width: 10rem;
    width: 30rem;
    margin: 10vh 4rem 0 4rem;
    display: grid;
    grid-template-rows: [left-start center-start right-start] 1fr [left-end center-end right-end];
    grid-template-columns: [left-start center-start right-start] 1fr [left-end center-end right-end];

    &-text {
        color: $blue;
        font-weight: 500;
        margin: 1rem;
    }
}

.header {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    &-logo {
        font-family: "Dancing Script", cursive;
        color: $shade-two;
        font-size: 2.4rem;
    }

    &-text {
        font-size: 1rem;
    }
}
</style>