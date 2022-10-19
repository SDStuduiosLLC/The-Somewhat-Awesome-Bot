/*
* @Author:      SDStudios - TSAB Development Team
* @Email:       tsab@sd-studios.ml
* @Date:        2022-10-18 19:23:05
* @Description: The build script for the TSAB framework.
 */

import { createSpinner } from "nanospinner";
import { exists, rmdirSync } from "fs";
import { basename } from "path";
import { spawn } from "child_process";

console.log(`
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
TSAB Build Compiler v2                                                     
Built and Maintained by SDStudios under the GNU AGPLv3 Licence             
Find us at https://github.com/sdstudios-official/The-Somewhat-Awesome-Bot! 
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`);

// Creating and initialising spinners
const spinnerInitSpinner = createSpinner('Starting processes').start();

const initSpinner = createSpinner('Initialising datasets');
const checkingThingSpinner = createSpinner('Checking some things');
const deletingExistingBuild = createSpinner('Deleting existing builds');
const compilingTypeScript = createSpinner('Compiling TypeScript');
const cleaningUp = createSpinner('Cleaning up');

spinnerInitSpinner.success();

// Initialising variables because i can
initSpinner.start();

const cwd = process.cwd();
const buildDirName = "/build";
const fullBuildDir = `${cwd}${buildDirName}`;
let   doesBuildExist = false;
let   buildType = "";

initSpinner.success();


// Checking file type of build and if build exists
checkingThingSpinner.start();

try {
    if (basename(__filename).endsWith('ts')) {
        buildType = "ts";
    } else {
        buildType = "js";
    }

    // if (existsSync(fullBuildDir)) {
    //     doesBuildExist = true;
    //     console.log('build exists!')
    // }

    exists(fullBuildDir, function(exists) {
        if (exists) {
            doesBuildExist = true;
            //     console.log('build exists!')
        }
    });

    checkingThingSpinner.success()
} catch (e) {
    checkingThingSpinner.error();
}

// Check if already running from compiled
if (buildType === "js") {
    console.log('Exiting! You are running this already compiled. Please run this from the raw source code.');
    process.exit();
}

// Delete existing build (if exists)
deletingExistingBuild.start();

if (doesBuildExist) {
    try {
        rmdirSync(fullBuildDir, { recursive: true })
        deletingExistingBuild.success();
    } catch (e) {
        deletingExistingBuild.error();
    }
} else {
    deletingExistingBuild.warn({ text: "No existing build!" })
}

// Build Typescript if in TS mode
if (buildType === "ts") {
    const tsc = spawn(`tsc`, ['--build', '../../../'], {
        cwd: cwd,
        shell: true,
    });

    tsc.stderr.on("data", data =>
    {
        console.log(`${data}`)
    })

    tsc.stdout.on("data", data =>
    {
        console.log(`${data}`)
    })
}

// Final build report
console.log(`
┏━━━━━━━━ TSAB Build Report ━━━━━━━━━┓
Build Directory: ${fullBuildDir}
Build Mode:      ${buildType}
Build Exist?:    ${doesBuildExist}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`);
