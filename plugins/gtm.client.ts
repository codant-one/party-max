export default defineNuxtPlugin(() => {
    if (process.client) {
      const script = document.createElement('script')
      script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://sst.partymax.co/4ici2ihuetbur.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','eaxqy0rq=aWQ9R1RNLU1QRkJNUEI%3D&psvKq=pije');`
      document.head.appendChild(script)
    }
})