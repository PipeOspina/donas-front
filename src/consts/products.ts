import { ProductModel, ProductSpec } from '@/types/Products/Product';

const defaultPackageType = (
  applyRangeIndexes: number[] | 'all',
): ProductSpec => ({
  type: 'multiple',
  defaultOptionIndex: 0,
  label: 'Tipo de caja',
  required: false,
  options: [
    {
      applyCost: 0,
      applyRangeIndexes,
      label: 'Navideña con logo (DyR)',
    },
    {
      applyCost: 0,
      applyRangeIndexes,
      label: 'Navideña sin logo (DyR)',
    },
    {
      applyCost: 0,
      applyRangeIndexes,
      label: 'Blanca',
    },
  ],
});

const natilla: ProductModel = {
  sortIndex: 1,
  image: {
    alt: '',
    src: '',
  },
  name: 'Combo Navideño',
  prices: [
    {
      min: 1,
      shipping: 8000,
      value: 5000,
      max: 24,
    },
    {
      min: 25,
      shipping: 0,
      value: 4900,
      max: 200,
    },
    {
      min: 201,
      shipping: 0,
      value: 4700,
      max: 500,
    },
    {
      min: 501,
      shipping: 0,
      value: 4500,
    },
  ],
  specs: [
    {
      type: 'single',
      applyCost: -300,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Un solo buñuelo',
      required: false,
      otherOptionsDisabled: [
        {
          index: 1,
        },
      ],
    },
    {
      type: 'single',
      applyCost: -300,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Sin hojuela',
      required: false,
      otherOptionsDisabled: [
        {
          index: 0,
        },
      ],
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Tipo de contenedor',
      required: false,
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Icopor',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Plástico con tapa',
        },
      ],
    },
    defaultPackageType('all'),
  ],
};

const sanduche: ProductModel = {
  sortIndex: 2,
  image: {
    alt: '',
    src: '',
  },
  name: 'Sanduche Tradicional',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 6000,
    },
  ],
  specs: [defaultPackageType('all')],
};

const pastel: ProductModel = {
  sortIndex: 3,
  image: {
    alt: '',
    src: '',
  },
  name: 'Pastel',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 6000,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Sabor',
      required: true,
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Jamón y queso',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Solo queso',
        },
        {
          applyCost: 500,
          applyRangeIndexes: 'all',
          label: 'Hawaiano',
        },
        {
          applyCost: 500,
          applyRangeIndexes: 'all',
          label: 'Arequipe',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Verduras',
        },
      ],
    },
    defaultPackageType('all'),
  ],
};

const gratinado: ProductModel = {
  sortIndex: 4,
  image: {
    alt: '',
    src: '',
  },
  name: 'Gratinado de Pollo',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 7000,
    },
  ],
  specs: [defaultPackageType('all')],
};

const croisant: ProductModel = {
  sortIndex: 5,
  image: {
    alt: '',
    src: '',
  },
  name: 'Croissant',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5000,
    },
  ],
  specs: [defaultPackageType('all')],
};

const palito: ProductModel = {
  sortIndex: 6,
  image: {
    alt: '',
    src: '',
  },
  name: 'Palito de Queso',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5000,
    },
  ],
  specs: [defaultPackageType('all')],
};

const panpizza: ProductModel = {
  sortIndex: 7,
  image: {
    alt: '',
    src: '',
  },
  name: 'Pan Pizza (Hawaiana)',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 6000,
    },
  ],
  specs: [defaultPackageType('all')],
};

const tamal: ProductModel = {
  sortIndex: 8,
  image: {
    alt: '',
    src: '',
  },
  name: 'Tamal',
  prices: [
    {
      min: 30,
      shipping: 0,
      value: 9000,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Sabor',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Cerdo - Pollo',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Cerdo - Res',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Res - Pollo',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Tres carnes',
        },
      ],
      required: true,
    },
  ],
};

const arroz: ProductModel = {
  sortIndex: 9,
  image: {
    alt: '',
    src: '',
  },
  name: 'Arroz Especial',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 12000,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Sabor',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Oriental',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Campesino',
        },
      ],
      required: true,
    },
    {
      type: 'single',
      applyCost: 1000,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Jugo de frutas',
      required: false,
    },
  ],
};

const hamburguesa: ProductModel = {
  sortIndex: 10,
  image: {
    alt: '',
    src: '',
  },
  name: 'Hamburguesa',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 10000,
    },
  ],
  specs: [
    {
      type: 'single',
      applyCost: 1000,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Jugo de frutas',
      required: false,
    },
  ],
};

const perro: ProductModel = {
  sortIndex: 11,
  image: {
    alt: '',
    src: '',
  },
  name: 'Perro',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 6000,
    },
  ],
  specs: [
    {
      type: 'single',
      applyCost: 1000,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Jugo de frutas',
      required: false,
    },
  ],
};

const aplastao: ProductModel = {
  sortIndex: 12,
  image: {
    alt: '',
    src: '',
  },
  name: 'Sanduche Aplastado',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 11000,
    },
  ],
  specs: [
    {
      type: 'single',
      applyCost: 1000,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Jugo de frutas',
      required: false,
    },
  ],
};

const lechona: ProductModel = {
  sortIndex: 13,
  image: {
    alt: '',
    src: '',
  },
  name: 'Porción de Lechona',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 12000,
    },
  ],
  specs: [
    {
      type: 'single',
      applyCost: 1000,
      applyRangeIndexes: 'all',
      defaultApplied: false,
      label: 'Jugo de frutas',
      required: false,
    },
  ],
};

const dona: ProductModel = {
  sortIndex: 14,
  image: {
    alt: '',
    src: '',
  },
  name: 'Dona',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5500,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Sabor',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Arequipe',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Chocolate',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Chantilly',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Mora',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Fresa',
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Empaque',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Caja por 1 unidad con Jugo de frutas',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Sin Jugo de frutas ni empaque',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Caja por 4 unidades sin Jugo de frutas',
        },
      ],
      required: false,
    },
    defaultPackageType('all'),
  ],
};

const milhoja: ProductModel = {
  sortIndex: 15,
  image: {
    alt: '',
    src: '',
  },
  name: 'Milhoja',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 7500,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Bebida',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Sin bebida',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
      ],
      required: true,
    },
  ],
};

const torta: ProductModel = {
  sortIndex: 16,
  image: {
    alt: '',
    src: '',
  },
  name: 'Torta',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 7500,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 1,
      label: 'Sabor',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Tres leches',
          otherOptionsDisabled: [
            {
              index: 2,
            },
          ],
        },
        {
          applyCost: -3000,
          applyRangeIndexes: 'all',
          label: 'Chocolate',
          otherOptionsDisabled: [
            {
              index: 1,
              subIndex: 0,
            },
          ],
        },
        {
          applyCost: -3000,
          applyRangeIndexes: 'all',
          label: 'Maria Luisa',
          otherOptionsDisabled: [
            {
              index: 1,
              subIndex: 0,
            },
          ],
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 1,
      label: 'Bebida',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Sin bebida',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
      ],
      required: true,
    },
    defaultPackageType('all'),
  ],
};

const brownie: ProductModel = {
  sortIndex: 17,
  image: {
    alt: '',
    src: '',
  },
  name: 'Brownie',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5500,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Bebida',
      options: [
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
        {
          applyCost: 1000,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
      ],
      required: true,
    },
    defaultPackageType('all'),
  ],
};

const rollo: ProductModel = {
  sortIndex: 18,
  image: {
    alt: '',
    src: '',
  },
  name: 'Rollo Dulce',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5000,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Sabor',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Coco',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Chocolate',
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Bebida',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
      ],
      required: true,
    },
    defaultPackageType('all'),
  ],
};

const pionono: ProductModel = {
  sortIndex: 19,
  image: {
    alt: '',
    src: '',
  },
  name: 'Pionono (Arequipe)',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 5500,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Bebida',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
      ],
      required: true,
    },
    defaultPackageType('all'),
  ],
};

const cajita: ProductModel = {
  sortIndex: 20,
  image: {
    alt: '',
    src: '',
  },
  name: 'Cajita Feliz',
  prices: [
    {
      min: 20,
      shipping: 0,
      value: 12000,
    },
  ],
  specs: [
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Contenido #1',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Sanduche',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Pastel hawaiano',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Pastel de jamón y queso',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Pastel de queso',
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Contenido #2',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Dona de arequipe',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Dona de chocolate',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Dona de chantilly',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Dona de mora',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Dona de fresa',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Paquete de papas fritas',
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Bebida',
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Leche',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Jugo de frutas',
        },
      ],
      required: true,
    },
    {
      type: 'multiple',
      defaultOptionIndex: 0,
      label: 'Tipo de caja',
      required: false,
      options: [
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Navideña con logo (DyR)',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Navideña sin logo (DyR)',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Blanca',
        },
        {
          applyCost: 0,
          applyRangeIndexes: 'all',
          label: 'Café',
        },
      ],
    },
  ],
};

const ancheta: ProductModel = {
  sortIndex: 21,
  image: {
    alt: '',
    src: '',
  },
  name: 'Ancheta',
  prices: [
    {
      min: 1,
      shipping: 0,
      value: 0,
    },
  ],
  specs: [],
};

export const productsToCreate: ProductModel[] = [
  natilla,
  sanduche,
  pastel,
  gratinado,
  croisant,
  palito,
  panpizza,
  tamal,
  arroz,
  hamburguesa,
  perro,
  aplastao,
  lechona,
  dona,
  milhoja,
  torta,
  brownie,
  rollo,
  pionono,
  cajita,
  ancheta,
];
