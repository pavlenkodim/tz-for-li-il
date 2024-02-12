class Element {
    constructor(id, head, name, node, price, sorthead) {
        this.id = id,
        this.head = head,
        this.name = name,
        this.node = node,
        this.price = price,
        this.sorthead = sorthead
    }

    isNode() {
        if (this.node === 1) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        let parent = ''
        if (this.head === null) {
            parent = '.container_list';
        } else {
            parent = `#node_${this.head}`
        }

        const container = document.querySelector(parent);
        if (!container) {
            return false;
        }

        const element = document.createElement('li'),
              price = `<span class="price">Цена: ${this.price}</span>`;
              element.id = `element_${this.id}`
              element.innerHTML = `<a class="element_name" href="#">${this.name}</a> ${this.price == 0 ? '' : price}`;

        if (this.isNode()) {
            const listEl = document.createElement('ul');
            listEl.id = `node_${this.id}`;
            container.append(element);
            container.append(listEl);
        } else {
            container.append(element);
        }

        return element;
    }
}

async function main (url) {
    const response = fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });

    if (!(await response).ok) {
        alert(`Ошибка HTTP: ${(await response).status}`);
    }

    return (await response).json();
}

function sorting (data) {
    for (let i = 0; i < data.services.length; i++) {
        for (let j = 0; j < data.services.length - 1; j++) {
            if (data.services[j].sorthead > data.services[j + 1].sorthead) {
                [data.services[j], data.services[j + 1]] = [data.services[j + 1], data.services[j]];
            }
        }
    }

    parseData(data);
}

function parseData(data) {

    for (let i = 0; i < data.services.length; i++) {
        const onPage = document.querySelector(`#element_${data.services[i].id}`);

        if (onPage) {
            continue;
        } else {
            if (data.services[i].node === 1) {
                new Element(data.services[i].id, data.services[i].head, data.services[i].name, data.services[i].node, data.services[i].price, data.services[i].sorthead).render();
                parseData(data);
            } else {
                new Element(data.services[i].id, data.services[i].head, data.services[i].name, data.services[i].node, data.services[i].price, data.services[i].sorthead).render();
            }
        }
    }
}

main('./data.json')
.then(sorting);