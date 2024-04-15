export class OrdersApi {
    async createOrder(order) {
        console.log(order);
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });

        if (!response.ok) {
            throw new Error("Failed to add new order");
        }

        return await response.json();
    }
}