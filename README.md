# Ribbit
An api module based around fetch

- [Installation](#installation)
- [Usage](#usage)
  - [Vue integration](#vue-integration)
  - [Overriding Headers](#overiding-headers)
- [License](#license)

## Installation

Using npm:

```bash
$ npm install --save-dev @sourcetoad/ribbit
```

Using yarn:

```bash
$ yarn add --dev @sourcetoad/ribbit
```

## Usage

**The main api class**

```javascript
import DataApi from '@js/modules/api/DataApi';

export default class Api {
    constructor(config = {}) {
        this.config = config;
    }

    get data() {
        if (!this.dataApi) {
            const config = this.config.data || {};
            this.dataApi = new DataApi(config);
        }

        return this.dataApi;
    }
}
```

**The base api that does any method and property overrides**

```javascript
import Ribbit from '@sourcetoad/ribbit';
import {xsrf} from '@js/helpers';

export default class BaseApi extends Ribbit {
    static get defaultHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': xsrf(),
        };
    }
}
```

**The individual classes to break up your methods**

```javascript
import BaseApi from '@js/modules/api/BaseApi';

export default class DataApi extends BaseApi {
    list(params = {}) {
        return this.get('/api/data', params);
    }
    
    create(data = {}) {
        return this.post('/api/data', {}, data);
    }

    read(id, params = {}) {
        return this.post(`/api/data/${id}`, params);
    }

    update(id, data = {}) {
        return this.patch(`/api/data/${id}`, {}, data);
    }

    destroy(id) {
        return this.delete(`/api/data/${id}`);
    }
}
```

### Vue Integration

The best way to use ribbit with vue is by creating a Vue plugin.

```javascript
import Api from '@js/modules/api';

export default {
    install(Vue, config = {}) {
        Vue.prototype.$api = new Api(config);
    }
}
```

In your app.js

```javascript
import Vue from 'vue';
import ApiPlugin from '@js/plugins/api';

Vue.use(ApiPlugin);

new Vue();
```

Components:

```vue
<template>
    <div>
        <button @click="getData">
            Load Data
        </button>
        <code>
            <pre>
                {{ data }}
            </pre>
        </code>
    </div>
</template>
<script>

export default {
    data() {
        return {
            data: undefined,
            loading: false,
            request: undefined
        }
    },
    methods: {
        async getData() {
            this.loading = true;

            if (this.request) {
                this.request.abort();
            }

            this.request = this.$api.data.list();
            const response = await this.request.send();

            if (response.status === 200) {
                this.data = await response.json();
            } else {
                const error = await response.json();
                console.error(error);
            }
            
            this.request = undefined;
            this.loading = false;
        },
    },
}
</script>
```

### Overriding Headers
By default, each api call includes a headers config value of `{'Accept': 'application/json'}`. 
You can override those default headers through the `defaultHeaders` static get method, 
or per call through the `config` argument.

```javascript
import BaseApi from '@js/modules/api/BaseApi';

export default class DataApi extends BaseApi {
    static get defaultHeaders() {
        return {
            // Default headers
        };
    }

    list(params = {}) {
        return this.get('/api/data', params, {
            headers: {
                ...this.constructor.defaultHeaders
                // Additional headers specific to list call
            }
        });
    }
}
```

## License

[ISC](LICENSE)
