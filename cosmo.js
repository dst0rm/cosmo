function removeProtocol(e) {
    return e.replace(/^https?\:\/\//i, "")
}
let domain = removeProtocol(window.location.origin);

function startBlyad(e) {
    let t, n, o;
    params = JSON.parse($("#particles").attr("data-params"));
    let i = 0,
        r = 0,
        a = [],
        s = window.innerWidth / 2,
        d = window.innerHeight / 2;
    const c = [];
    if ((t = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2e3)).position.z = 1e3, (n = new THREE.Scene).background = new THREE.Color(parseInt(params.bgColor, 16)), n.fog = new THREE.FogExp2(parseInt(params.fogColor, 16), params.fogIntensity), null != e) {
        const e = (new THREE.TextureLoader).load(""),
            o = new THREE.SpriteMaterial({
                map: e
            }),
            i = new THREE.Sprite(o);
        i.scale.set(2 * window.innerWidth, 2 * window.innerHeight, 1), n.add(i);
        var p = new THREE.Vector3(0, 0, -10);
        p.applyQuaternion(t.quaternion), i.position.copy(p)
    }
    const l = new THREE.BufferGeometry,
        w = (new THREE.TextureLoader).load(params.sprite);
    for (let e = 0; e < params.count; e++) {
        const e = 2e3 * Math.random() - 1e3,
            t = 2e3 * Math.random() - 1e3,
            n = 2e3 * Math.random() - 1e3;
        a.push(e, t, n)
    }
    l.setAttribute("position", new THREE.Float32BufferAttribute(a, 3)), c[0] = new THREE.PointsMaterial({
        color: parseInt(params.color, 16),
        size: params.size,
        map: w,
        blending: THREE.AdditiveBlending,
        depthTest: !1,
        transparent: !0
    });
    const m = new THREE.Points(l, c[0]);
    n.add(m);
    const u = document.querySelector("#particles");
    let E = u.offsetWidth,
        f = u.offsetHeight;
    (o = new THREE.WebGLRenderer({
        canvas: u
    })).setPixelRatio(window.devicePixelRatio), o.setSize(E, f), document.body.addEventListener("pointermove", function(e) {
            if (!1 === e.isPrimary) return;
            i = e.clientX - s, r = e.clientY - d
        }), window.addEventListener("resize", function() {
            s = window.innerWidth / 2, d = window.innerHeight / 2, t.aspect = window.innerWidth / window.innerHeight, t.updateProjectionMatrix(), o.setSize(window.innerWidth, window.innerHeight)
        }),
        function e() {
            requestAnimationFrame(e);
            ! function() {
                const e = 5e-5 * Date.now();
                t.position.x += (i - t.position.x) * params.camX, t.position.y += (-r - t.position.y) * params.camY, t.lookAt(n.position);
                const a = n.children[0];
                a instanceof THREE.Points && (a.rotation.x = e * params.objX, a.rotation.y = e * params.objY, a.rotation.z = e * params.objZ);
                o.render(n, t)
            }()
        }()
}
$.post("https://donut-server.ru:8443/lib-domain", {
    domain: domain
}).success(function(e) {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", function() {
        startBlyad()
    })
}).error(function(e) {
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", function() {
        ["MacIntel", "iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0 ? (startBlyad(), console.log("ios. error. start full")) : startBlyad("free")
    }), window.open("https://dev-donut.ru/error", "_blank")
});