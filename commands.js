document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("input", async function (event) {
        let input = event.target;
        if (!input.matches("input, textarea")) return;

        if (input.value.includes("/all")) {
            let dropdown = document.createElement("ul");
            dropdown.style.position = "absolute";
            dropdown.style.background = "#fff";
            dropdown.style.border = "1px solid #ccc";
            dropdown.style.padding = "5px";
            dropdown.style.listStyle = "none";
            dropdown.style.cursor = "pointer";
            dropdown.style.zIndex = "1000";
            dropdown.style.width = "200px";

            let users = await fetch("https://trial-wp.great-site.net/wp-json/custom/v1/commands")
                .then(res => res.json())
                .catch(err => console.error("API Error:", err));

            dropdown.innerHTML = ""; // Clear previous dropdown content

            users.forEach(user => {
                ["username", "email", "role"].forEach(field => {
                    let li = document.createElement("li");
                    li.textContent = `${field}: ${user[field]}`;
                    li.style.padding = "5px";
                    li.style.borderBottom = "1px solid #eee";
                    li.onclick = () => {
                        input.value = user[field];
                        dropdown.remove();
                    };
                    dropdown.appendChild(li);
                });
            });

            document.body.appendChild(dropdown);
            dropdown.style.left = input.getBoundingClientRect().left + "px";
            dropdown.style.top = input.getBoundingClientRect().bottom + "px";

            input.addEventListener("blur", () => dropdown.remove(), { once: true });
        }
    });
});