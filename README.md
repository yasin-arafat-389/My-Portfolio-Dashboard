# DineDash (Admin & Vendor Panel)

## Introduction

The **DineDash Dashboard** serves as the control center for both vendors and administrators. Vendors can manage their shops, products, and orders, while administrators oversee platform operations, user management, and system-wide activities. The dashboard ensures efficient workflows, streamlined management, and a responsive design tailored for various devices.

## Live URL

- **Dashboard Live URL:** [Dashboard Client](https://dine-dash-dashboard-side.web.app/)

## Technology Stack & Packages

- **Framework:** React.js
- **State Management:** Redux Toolkit
- **CSS Framework:** Tailwind CSS
- **Routing:** React Router
- **Authentication:** Firebase Authentication
- **Forms:** React Hook Form
- **HTTP Client:** Axios
- **Animations:** Lottie React

### Other Tools

- **Package Manager:** npm
- **Icons:** React Icons, Material Tailwind
- **Toast Notifications:** React Hot Toast

# Key Features & Functionality

## Vendor Dashboard

### Shop Management

- **Shop Details:** Manage shop information, including name, logo, and description.
- **Follower Management:** View the number of followers and manage shop visibility.

### Product Management

- **Add Products:** Add new products with attributes like name, price, category, inventory, and images.
- **Edit & Duplicate:** Edit existing product details or duplicate products for faster entries.
- **Inventory Updates:** Manage inventory levels and mark products as in/out of stock.

### Reviews and Ratings

- **View Reviews:** Access customer reviews and ratings for individual products.
- **Respond to Reviews:** Reply to customer reviews to engage and resolve feedback.

### Order History

- **View Orders:** Detailed order history for all transactions involving the shop.
- **Order Tracking:** Monitor the status of orders placed by customers.

---

## Admin Dashboard

### User Management

- **Monitor Users:** View and manage all platform users (vendors and customers).
- **Account Actions:** Suspend or delete user accounts as necessary.

### Vendor Management

- **Blacklist Vendors:** Blacklist vendor shops to restrict their activities.
- **Monitor Shops:** Review and approve vendor shop details and operations.

### Product Categories

- **Dynamic Category Management:** Add, edit, or delete product categories dynamically.

### Transaction Monitoring

- **Track Transactions:** Monitor all transactions across the platform.
- **Analytics:** Access financial insights and transaction data for performance evaluation.

---

## Common Features

### Responsive Design

- Fully responsive dashboards for seamless use on desktops, tablets, and mobile devices.

### Scalability

- **Paginated Lists:** Efficiently handle large datasets with pagination, including:
  - Vendor products.
  - Customer and vendor orders.
  - Reviews and followers.

## Installation Guideline

### Prerequisites

- Node.js (version 14 or above)
- npm (version 6 or above) or yarn (version 1.22 or above)

### Installation Steps

1. **Clone the repository**

   ```sh
   https://github.com/yasin-arafat-389/DineDash-Dashboard-Side
   ```

   2. **Navigate to the project directory**

   ```sh
   cd DineDash-Dashboard-Side

   ```

   3. **Install the dependencies**

   ```sh
   npm install
   ```

### Configuration

1.  **Replace base URL according to your local machine**

```sh
const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});
```
