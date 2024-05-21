#define NUM_LAYERS 3.

varying vec2 uvf;

uniform float time;

uniform vec2 mouseUv;

mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = .05/d;

    float rays = max(0., 1.-abs(uv.x*uv.y*1000.));
    m += rays*flare;
    uv *= Rot(3.1415/4.);
    rays = max(0., 1.-abs(uv.x*uv.y*1000.));
    m += rays*3.*flare;

    m *= smoothstep(1., .2, d);
    return m;
}

float Hash21(vec2 p) {
    p = fract(p*vec2(123.34, 456.21));
    p += dot(p, p+45.32);
    return fract(p.x*p.y);
}

vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0);

    vec2 gv = fract(uv) - .5;
    vec2 id = floor(uv);

    for (int ye = -1; ye <= 1; ye++) {
        for (int xe = -1; xe <= 1; xe++) {
            vec2 offs = vec2(xe, ye);

            float n = Hash21(id + offs); // random between 0 and 1
            float size = fract(n * 345.32);

            float star = Star(gv - offs - vec2(n, fract(n * 34.)) + .5, smoothstep(.9, .5, n));
            vec3 color = sin(vec3(.2, .3, .9) * fract(n * 2345.2) * 123.2) * .5 + .5;
            color = color * vec3(1, .5, 1. + size);

            star *= sin(time * 3. + n * 6.2) * .5 + .5;
            col += star * size * color;
        }
    }

    return col;
}

float desaturate(float one, float target, float intensity) {
    return (one + target * intensity) / (intensity + 1.);
}

vec3 desaturate(vec3 color) {
    float avg = (color.r + color.g + color.b) / 3.;
    return vec3(
        desaturate(color.r, avg, 3.),
        desaturate(color.g, avg, 3.),
        desaturate(color.b, avg, 3.));
}


vec3 mouseMod(vec3 col, float t) {
    //float xDistort = (sin(t * 300.) + 1.) * 3.0 + 3.0;
    //float yDistort = (sin(t * 700. + 2.0) + 1.) * 6.0 + 3.0;
    //vec2 distort = vec2(yDistort, xDistort);
    vec2 distort = vec2(2., 1.);
    float dist = max(0., 1.0 - distance(uvf * distort, mouseUv * distort) * 15.0) * 12.0 + 1.;
    col.r *= dist;
    col.g *= dist;
    col.b *= dist;
    /*col.r = dist;
    col.g = dist;
    col.b = dist;*/
    return col;
}

void main()
{
    vec2 uv = uvf * 10.;

    float t = time*.005;

    uv *= Rot(t);
    vec3 col = vec3(0);

    for(float i=0.; i<1.; i+=1./NUM_LAYERS) {
        float depth = fract(i+t);
        float scale = mix(20., .5, depth);
        float fade = depth*smoothstep(1., .9, depth);
        col += StarLayer(uv*scale+i*453.2) * fade;
    }

    gl_FragColor = vec4(mouseMod(desaturate(col) * .3, t), 1.);
}
