export interface BaseResponse<T> {
    code: number;
    data: T;
    message: string;
}


export interface TableList<T> {
    total: number
    list: T[]
}

// 定义GeoJSON坐标类型
type GeoJSONCoordinate = number[];
type GeoJSONCoordinateArray = GeoJSONCoordinate[];
type GeoJSONPolygonCoordinate = GeoJSONCoordinateArray[];

// 定义GeoJSON位置类型
interface GeoJSONPosition {
    type: "Point";
    coordinates: GeoJSONCoordinate;
}

interface GeoJSONMultiPoint extends GeoJSONPosition {
    type: "MultiPoint";
    coordinates: GeoJSONCoordinateArray;
}

interface GeoJSONLineString {
    type: "LineString";
    coordinates: GeoJSONCoordinateArray;
}

interface GeoJSONMultiLineString extends GeoJSONLineString {
    type: "MultiLineString";
    coordinates: GeoJSONCoordinateArray[];
}

interface GeoJSONPolygon {
    type: "Polygon";
    coordinates: GeoJSONPolygonCoordinate;
}

interface GeoJSONMultiPolygon extends GeoJSONPolygon {
    type: "MultiPolygon";
    coordinates: GeoJSONPolygonCoordinate[];
}

// 定义GeoJSON几何对象类型
type GeoJSONGeometryObject =
    | GeoJSONPosition
    | GeoJSONMultiPoint
    | GeoJSONLineString
    | GeoJSONMultiLineString
    | GeoJSONPolygon
    | GeoJSONMultiPolygon;

// 定义GeoJSON属性对象类型
interface GeoJSONProperties {
    [key: string]: any;
}

// 定义GeoJSON特征类型
interface GeoJSONFeature {
    type: "Feature";
    geometry: GeoJSONGeometryObject;
    properties?: GeoJSONProperties;
    id?: string | number;
}

// 定义GeoJSON特征集合类型
interface GeoJSONFeatureCollection {
    type: "FeatureCollection";
    features: GeoJSONFeature[];
}

// 定义GeoJSON对象类型（包括特征和特征集合）
export type GeoJSONObject = GeoJSONFeatureCollection;

// 示例使用
const pointFeature: GeoJSONFeature = {
    type: "Feature",
    geometry: {
        type: "Point",
        coordinates: [102.0, 0.5]
    },
    properties: {
        name: "Sample Point"
    }
};

const featureCollection: GeoJSONFeatureCollection = {
    type: "FeatureCollection",
    features: [pointFeature]
};

// 验证GeoJSON对象
function isValidGeoJSON(obj: any): obj is GeoJSONObject {
    return obj.type === "Feature" || obj.type === "FeatureCollection";
}

console.log(isValidGeoJSON(pointFeature)); // true
console.log(isValidGeoJSON(featureCollection)); // true