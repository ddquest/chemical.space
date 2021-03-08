<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      color="primary"
      fixed
      dark
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        v-text="title"
        style="cursor: pointer"
        @click="$router.push('/')"
        />
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      color="primary"
      absolute
      temporary
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-footer
        :fixed="fixed"
        app
      >
        <span>@souyakuchan &copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'top',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'editor',
          to: '/editor'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'viewer',
          to: '/viewer?loadFromPDB=1ema'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'License',
          to: '/license'
        },
      ],
      miniVariant: false,
      title: 'chemical.space',
    }
  },

  head () {
    return {
    }
  }
}
</script>
