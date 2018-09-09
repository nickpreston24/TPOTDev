var expect = require('chai').expect;

function Cat(name)
{
    this.name = name;

    this.setName = async (name) =>
    {
        // return new Promise((result, reject) => {
        //     setTimeout(() => {
        //         this.name = name;
        //     }, 5000)
        // });

        sleep(() =>
        {
            console.log('inside the sleep()');
            this.name = name;
        }, null, 3000);

    }

    function timeout(milliseconds)
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async function sleep(func, args, ms)
    {
        const response = await timeout(ms);
        return func(args);
    }

}

describe('kitty', () =>
{
    it('should print name', async () =>
    {

        var cat = new Cat('Heathcliff');
        console.log(cat.name);

        await cat.setName('Barney');
        console.log(cat.name);

    });

});