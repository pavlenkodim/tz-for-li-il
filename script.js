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
        const parent = this.head === null ? '.container_list' : `#element_${this.head}`,
              container = document.querySelector(parent),
              element = document.createElement('li'),
              price = `<span class="price">Цена: ${this.price}</span>`;
              const listEl = document.createElement('ul');


        if(this.head === null) {
            container.append(element);
        } else if (this.isNode()) {
            container.append(listEl);
            listEl.append(element);
        } else {
            listEl.append(element);
        }

        element.id = `element_${this.id}`
        element.innerHTML = `<a class="element_name" href="#">${this.name}</a> ${this.price == 0 ? '' : price}`;

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
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length - 1; j++) {
            if (data[j].sorthead > data[j + 1].sorthead) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]];
            }
        }
      }
}

function parseData(data) {
    sorting(data.services);
    console.log(data.services);

    data.services.forEach(item => {
        const element = new Element(item.id, item.head, item.name, item.node, item.price, item.sorthead),
              elementDom = element.render();
        console.log(elementDom);
        
    });

}

main('./data.json')
.then(parseData);