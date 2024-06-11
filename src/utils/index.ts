export function bundleExists(bundle: any) {
    let exists = true;
    if (!bundle) {
        exists = false;
    }
    return exists;
}