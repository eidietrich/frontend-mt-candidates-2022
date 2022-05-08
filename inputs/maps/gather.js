// Based on map design at https://observablehq.com/@eidietrich/montana-legislative-district-maps
// Adapted from https://www.npmjs.com/package/@alex.garcia/observable-prerender?activeTab=readme

const { load } = require("@alex.garcia/observable-prerender");

(async () => {
    const format = await import('d3-format')

    // const pad = format.format("02d")
    const OUT_PATH = './inputs/maps'
    const notebook = await load(
        "@eidietrich/montana-legislative-district-maps",
        ["districtMapRendered"],
        {
            width: 400, // width of simulated browser window
        }
    );
    const houseDistricts = Array.from(Array(100).keys()).map(d => String(d + 1))
    const senateDistricts = Array.from(Array(50).keys()).map(d => String(d + 1))

    await notebook.redefine("curChamber", 'house')
    for await (let district of houseDistricts) {
        await notebook.redefine("curDistrict", district)
        await notebook.screenshot("districtMapRendered", `${OUT_PATH}/png/HD${district}.png`)
        // await notebook.svg("districtMapRendered", `${OUT_PATH}/svg/HD${district}.svg`)
        console.log(`Written ${OUT_PATH}/HD${district}`)
    }

    await notebook.redefine("curChamber", 'senate')
    for await (let district of senateDistricts) {
        await notebook.redefine("curDistrict", district)
        await notebook.screenshot("districtMapRendered", `${OUT_PATH}/png/SD${district}.png`)
        // await notebook.svg("districtMapRendered", `${OUT_PATH}/svg/SD${district}.svg`)
        console.log(`Written ${OUT_PATH}/SD${district}`)
    }

    await notebook.browser.close();
    console.log('Done')
})();
