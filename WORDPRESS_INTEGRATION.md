# WordPress Integration Guide

You can use this React frontend with WordPress in two ways.

## Option 1: Headless WordPress (Recommended)

In this setup, WordPress is used only for content management (Products, Orders), and this React app handles the entire frontend.

1.  **Backend:** Install WordPress + WooCommerce.
2.  **API:** Enable the WooCommerce REST API (WooCommerce > Settings > Advanced > REST API).
3.  **Frontend:** Host this React app on Vercel, Netlify, or any static host.
4.  **Connect:** Update `constants.ts` or `shopService.ts` to fetch data from `https://your-wordpress-site.com/wp-json/wc/v3/products`.

## Option 2: Embed inside a WordPress Theme

You can run this app *inside* a specific page on your WordPress site using a shortcode.

### Step 1: Build the App
Run the build command in your terminal:
```bash
npm run build
```
This creates a `build` folder. Look inside `build/static/js/` and find the `main.[hash].js` file.

### Step 2: Upload to WordPress
Upload the JS and CSS files from the build folder to your WordPress theme folder (e.g., `/wp-content/themes/your-theme/react-app/`).

### Step 3: Add PHP Code
Add the following code to your theme's `functions.php` file:

```php
<?php
// functions.php

function load_wow_stunning_react_app() {
    // Only load on the specific page where you want the app
    if (is_page('shop-app')) {
        
        // 1. Enqueue the React Build JS
        wp_enqueue_script(
            'wow-stunning-react', 
            get_template_directory_uri() . '/react-app/main.js', // Rename your build file to main.js for simplicity
            array(), 
            '1.0', 
            true
        );

        // 2. Enqueue the React Build CSS
        wp_enqueue_style(
            'wow-stunning-styles', 
            get_template_directory_uri() . '/react-app/main.css'
        );

        // 3. Pass Data from WordPress to React (e.g., API settings or logged-in user)
        wp_localize_script('wow-stunning-react', 'wpData', array(
            'root_url' => get_site_url(),
            'nonce' => wp_create_nonce('wp_rest')
        ));
    }
}
add_action('wp_enqueue_scripts', 'load_wow_stunning_react_app');

// Create the shortcode to place the app
function wow_stunning_shortcode() {
    return '<div id="root"></div>';
}
add_shortcode('wow_stunning_app', 'wow_stunning_shortcode');
?>
```

### Step 4: Use it
Create a WordPress page called "Shop App" and add the shortcode:
`[wow_stunning_app]`

## Connecting Real Data
To make the app dynamic, modify `services/shopService.ts` to fetch from the WP API instead of using the mock data in `constants.ts`.

Example fetch:
```typescript
const response = await fetch('https://your-site.com/wp-json/wc/v3/products', {
  headers: {
    'Authorization': 'Basic ' + btoa('consumer_key:consumer_secret')
  }
});
const products = await response.json();
```
