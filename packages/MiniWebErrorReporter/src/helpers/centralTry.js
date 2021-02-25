export default function centraTry(cb) {
    try {
        return cb && cb();
    } catch (err) {
        console.log(err);
    }
}